import React, { useState } from 'react';

export const EmailInput = ({ placeholder, value, onChange, id }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const email = e.target.value;
    if (!validateEmail(email)) {
      setErrorMessage('X');
    } else {
      setErrorMessage('V');
    }
    onChange(e);
  };

  return (
    <div>
      <input
        type="email"
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        id={id}
      />
      {errorMessage && <small className="error-message">{errorMessage}</small>}
    </div>
  );
};
