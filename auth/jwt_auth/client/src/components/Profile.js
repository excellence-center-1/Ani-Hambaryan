import React, {Component, useEffect, useState} from "react"
import { Navigate } from "react-router-dom"
import AuthService from "../services/auth.service"

export const Profile = () => {
    const [redirect, setRedirect] = useState(null);
    const [userReady, setUserReady] = useState(false);
    const [currentUser, setCurrentUser] = useState({username: ""});

    useEffect(
        () => {
            const currentUser = AuthService.getCurrentUser();

            if(!currentUser){
                setRedirect("/home");
            } else {
                setCurrentUser(currentUser);
                setUserReady(true);
            }
    }, []);

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="container">
            {userReady ? (
                <div>
                <header >
                   <h3>
              <strong>{currentUser.username}</strong> Profile
            </h3>
                </header>
                <p>
                <strong>Token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
              </p>
              <p>
                <strong>Id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>Email:</strong> {currentUser.email}
              </p>
              <strong>Authorities:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
              </ul>
            </div>
            ) : null}
        </div>
    );
};