import React from 'react';
import regImage from '../reg.png'


export const WelcomeSignUp = () => {
  return (
    <div className='container text-primary text-center m-auto'>
      <img src={regImage} alt="Registration Success" />
      <h1 className=''>CONGRATULATIONS </h1>
      <h2> YOUR REGISTRATION HAS BEEN SUCCESSFUL</h2>
    </div>
  );
};



