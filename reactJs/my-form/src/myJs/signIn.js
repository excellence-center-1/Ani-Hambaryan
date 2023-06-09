import React, { useState } from 'react';
import { EmailInput } from '../Inputs/emailInput';

export default function SignIn() {
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
            <input type="password" placeholder="New password" value={password} onChange={handleInputChange} id='password' />

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Sign in
            </button>

            <div className="messages">
                {errorMessage()}
            </div>
        </div>
    );
}
