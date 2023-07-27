
//client/src/componentsregister.js
import React, { useState } from "react";
import AuthService from "../services/auth.service";

export const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    AuthService.register(username, email, password)
      .then(
        (response) => {
          setMessage(response.data);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();

          setSuccessful(false);
          setMessage(resMessage);
        }
      );
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
