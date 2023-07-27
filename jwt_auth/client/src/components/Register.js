
//client/src/componentsregister.js
import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import {
    isValidEmail,
    isValidPassword,
    isValidUsername
} from "../validations/validationUtils";


export const Register = () => {

    const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [selectedRole, setSelectedRole] = useState("user");

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        if (!isValidUsername(username)) {
            setMessage("Invalid username. Username should be at least 4 characters long.");
            return;
        }

        if (!isValidEmail(email)) {
            setMessage("Invalid email address.");
            return;
        }

        if (!isValidPassword(password)) {
            setMessage("Invalid password. Password should be at least 8 characters long and contain uppercase, lowercase, and special characters.");
            return;
        }

        try {
            const response = await AuthService.register(username, email, password, selectedRole);
            setMessage("Registration success");
            setSuccessful(true);

            const loginResponse = await AuthService.login(username, password);
            if (loginResponse.accessToken) {
                setTimeout(
                    () => {
                        navigate("/profile");
                        window.location.reload();
                    }, 1000
                )
            } else {
                setMessage("Failed! Username or email is already in use!");
            }
        } catch (error) {
            const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
            setSuccessful(false);
            setMessage(resMessage);
            if (resMessage === "Failed! Username is already in use!" ||
                resMessage === "Failed! Email is already in use!") {
                setMessage("Failed! Username or email is already in use!");
            }
        };
    };

        const onChangeUsername = (e) => {
            setUserName(e.target.value);
        };

        const onChangeEmail = (e) => {
            setEmail(e.target.value);
        };

        const onChangePassword = (e) => {
            setPassword(e.target.value);
        };
        const onChangeRole = (e) => {
            setSelectedRole(e.target.value);
        };
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <img
                        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                        alt="profile-img"
                        className="profile-img-card"
                    />
                    <form onSubmit={handleRegister}>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={username}
                                        onChange={onChangeUsername}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={onChangeEmail}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="role">Role</label>
                                    <select
                                        className="form-control"
                                        name="role"
                                        value={selectedRole}
                                        onChange={onChangeRole}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                        <option value="moderator">Moderator</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {message && (
                            <div className="form-group">
                                <div
                                    className={successful ? "alert alert-success" : "alert alert-danger"}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );

    };