
//Logo.js
import { Typography } from "@mui/material";
import logo from '../assets/static/logo.png'
import { useRedirect } from 'react-admin';
import IconButton from '@mui/material/IconButton';

export const Logo = () => {
    const redirect = useRedirect();
    const handleClick = () => {
        redirect('/dashboard');
    }
    return (
        <IconButton size="small" edge="start" color="inherit" sx={{ ml: 5, p: 0, my: 0 }} onClick={handleClick}>
            <img src={logo} alt="Logo" />
        </IconButton>
    );
};