import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const Login = () => {
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    const USER_REGEX = /^[A-Z][a-zA-Z0-9_-]{2,15}$/;
    const navigate = useNavigate();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        if (fieldName === 'user') {
            setUser(value);
        } else if (fieldName === "password") {
            setPwd(value);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validUs = USER_REGEX.test(user);
        const validPass = PWD_REGEX.test(pwd);
        if (!validUs || !validPass) {
            setErrMsg('Invalid Name or password');
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: user, password: pwd }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    setToken(data.token);
                    setErrMsg('Login Success');
                    Cookies.set('username', user, { expires: 1 });
                    setTimeout(() => {
                        navigate("/home", { state: { username: user } });
                    }, 1000);
                } else {
                    setErrMsg('Invalid username or password');
                }
            } else {
                setErrMsg('Invalid username or password');
            }
        } catch (err) {
            setErrMsg('Invalid username or password');
        }
    };


    return (
        <div className="container w-25 mt-5 bg-danger-subtle p-4 text-center">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} >{errMsg}</p>
            <h1>Login</h1>
            <form className="d-flex flex-column p-5 mt-5">
                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input type="text" name='user' value={user} onChange={(e) => handleInputChange(e, 'user')} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" value={pwd} onChange={(e) => handleInputChange(e, 'password')} className="form-control" />
                </div>
                <div className="mb-3">
                    <button type="submit" onClick={handleSubmit} className="btn btn-secondary">Login</button>
                </div>
            </form>
            <Link to="/" className="text-secondary">Signup</Link>
        </div>
    )
}
