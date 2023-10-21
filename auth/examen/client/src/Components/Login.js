//Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext';



axios.defaults.baseURL = process.env.REACT_APP_API_URL;
export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    try {
      const response = await axios.post('/auth/login', { email, password }, { withCredentials: true });
      console.log('Response:', response);
      login();
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='auth-form'>
      <h1>Login</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' id='email' name='email' />
        <label htmlFor='password'>password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='*********' id='password' name='password' />
        <button className='sign-button'>Sign In</button>
      </form>
      <Link to="/registration" >
        <button className='link-button'>Don't have an account? Register here.</button>
      </Link>
    </div>
  );
};

