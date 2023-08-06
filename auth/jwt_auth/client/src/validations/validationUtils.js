const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isValidUsername = (username) => {
    return username.length >= 3 && /^[A-Z]/.test(username);
  };

  const isValidPassword = (password) => {
    // Password should be at least 8 characters long and contain uppercase, lowercase, and special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  export { isValidEmail, isValidUsername, isValidPassword };