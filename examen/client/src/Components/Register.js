//Register.js
import React, { useState } from 'react';
import axios from 'axios';
import  { Link, useNavigate } from 'react-router-dom'
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('/auth/registration', { email, name, password}, { withCredentials: true }); 
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className='auth-form'>
      <h1>Register</h1>
    <form className='register-form' onSubmit={handleSubmit}>
    <label htmlFor='name'>Full name</label>
      <input value={name} onChange={(e)=> setName(e.target.value)} type='text' placeholder='Full Name' id='name' name='name'/>
      <label htmlFor='email'>email</label>
      <input value={email} onChange={(e)=> setEmail(e.target.value)} type='email' placeholder='youremail@gmail.com' id='email' name='email'/>
      <label htmlFor='password'>password</label>
      <input value = {password} onChange={(e)=> setPassword(e.target.value)}  type='password' placeholder='*********' id='password' name='password'/>
      <button className='sign-button'>Sign up</button>
    </form>
    <Link to="/login" >
    <button className='link-button'>Already have an account? Login here.</button>
    </Link>
   </div>
  )
};

