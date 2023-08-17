import React, { useState } from "react";
import { useLogin } from "react-admin";
import { Button, CardActions, CircularProgress } from "@mui/material";

export const LoginForm = () => {
    const [loading, setLoading] = useState(false);
    const login = useLogin();

    const handleLogin = () => {
        setLoading(true);
        login({});
    };

    return (
        <CardActions>
            <Button
                type="submit"
                color="primary"
                onClick={handleLogin}
                disabled={loading}
                fullWidth
            >
                {loading && (
                    <CircularProgress sx={{ marginRight: 1}} size={18} thickness={2} />
                )}
                Login with Google
            </Button>
        </CardActions>
    );
};


