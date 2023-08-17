import React from 'react';
import { GoogleLogin } from 'react-google-login';
import {authProvider} from "../utils/googleProvider"
import { Button } from 'react-admin';

const GOOGLE_CLIENT_ID = '654868766388-l165egll3330ikvpf734diu2lf54uehc.apps.googleusercontent.com';

export const GoogleButton = () => {
    const handleLoginWithGoogle = () => {
        authProvider.login();
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleLoginWithGoogle}
            >
                Login with Google
            </Button>
        </div>
    );
};


