import { AuthProvider } from "react-admin";
//openid oauth0 
//UserManager-ստանում է ինֆո user*ի մասին
import {UserManager} from "oidc-client-ts";
import  {getProfileFromToken} from "./getProfileFromToken";

const issuer = process.env.GOOGLE_ISSUER
const clientId = process.env.GOOGLE_CLIENT_ID
const redirectUrl = process.env.GOOGLE_REDIRECT_URL
const apiUrl = process.env.GOOGLE_API_URL

const userManager = new UserManager({
    authority: issuer,
    client_id: clientId,
    redirect_uri: redirectUrl,
    response_type: "code",
    scope: "openid email profile",
  });

  const cleanup = () => {
    window.history.replaceState({}, window.document.title, window.location.origin);
  };

  export const authProvider = {
    login: async () => {
        // 1. Redirect to the issuer to ask authentication
    await userManager.signinRedirect();
    },

    logout: () => {
        localStorage.removeItem("token");
        return Promise.resolve();
      },
      checkError: () => {
        localStorage.removeItem("token");
        return Promise.resolve();
      },
      checkAuth: () => {
        const token = localStorage.getItem("token");
    
        if (!token) {
          return Promise.reject();
        }
    
        // This is specific to the Google authentication implementation
        const jwt = getProfileFromToken(token);
        const now = new Date();
    
        return now.getTime() > jwt.exp * 1000
          ? Promise.reject()
          : Promise.resolve();
      },
      getPermissions: () => Promise.resolve(),
      getIdentity: () => {
        const token = window.localStorage.getItem("token");
        const profile = getProfileFromToken(token);
    
        return Promise.resolve({
          id: profile.sub,
          fullName: profile.name,
          avatar: profile.picture,
        });
      },
      handleCallback: async () => {
        // We came back from the issuer with ?code infos in query params
        const { searchParams } = new URL(window.location.href);
        const code = searchParams.get("code");
        const state = searchParams.get("state");
    
        // oidc-client uses localStorage to keep a temporary state
        // between the two redirections. But since we need to send it to the API
        // we have to retrieve it manually
        const stateKey = `oidc.${state}`;
        const { code_verifier } = JSON.parse(
          localStorage.getItem(stateKey) || "{}"
        );
    
        // Transform the code to a token via the API
        const response = await fetch(`${apiUrl}/code-to-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: code, code_verifier }),
        });
    
        if (!response.ok) {
          cleanup();
          return Promise.reject();
        }
    
        const token = await response.json();
    
        localStorage.setItem("token", JSON.stringify(token));
        userManager.clearStaleState();
        cleanup();
        return Promise.resolve();
      },
    };
    
