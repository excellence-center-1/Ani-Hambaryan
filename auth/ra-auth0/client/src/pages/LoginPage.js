import React from 'react';
import { Login } from 'react-admin';

import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
    return (
        <Login>
            <LoginForm />
        </Login>
    );
};
