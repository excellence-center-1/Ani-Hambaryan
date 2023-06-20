import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailInput } from '../Inputs/emailInput';

export const SignIn = () => {
  const [formData, setFormData] = useState({
    password: '',
    email: '',
  });

  const { password, email } = formData;

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  const errorMessage = () => {
    return (
      <div className="error" style={{ display: error ? '' : 'none' }}>
        <h6>The account is not valid</h6>
      </div>
    );
  };

  return (
    <div className="form">
      <h3>Sign in</h3>
      <hr />
      <EmailInput placeholder='email' value={email} onChange={handleInputChange} id='email' />
      <input type="password" placeholder="password" value={password} onChange={handleInputChange} id='password' />

      <Link to="/my-page" className="btn btn-primary" onClick={handleSubmit}>Sign In</Link>

      <div className="messages">
        {errorMessage()}
      </div>
    </div>
  );
}
