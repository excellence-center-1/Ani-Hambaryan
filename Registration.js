import React, { useState } from 'react';
import Select from 'react-select'
import { handleInput } from './handleInput';
import { handleSelect } from './handleSelect';
import { optionMonth, optionYear, optionDay } from './constans';
import TextInput from './textInputs';


export default function RegistrationForm() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    selectedMonth: null,
    selectedDay: '01',
    selectedYear: '2023',
    selectedRadio: '',
  });

  const { firstName, lastName, email, password, selectedMonth, selectedDay, selectedYear, selectedRadio } = formData;

  const handleInputChange = (e) => {
    handleInput(e, setFormData);
  };
  const handleSelectChange = (selectedOption, id) => {
    handleSelect(selectedOption, id, setFormData);
  };
  const handleRadioChange = (e) => {
    setFormData((prevState) => ({ ...prevState, selectedRadio: e.target.value }));
  };
  
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  
  const handleSubmit = () => {
    if (firstName === '' || lastName === '' || email === '' || password === '' || selectedMonth === null || selectedRadio === '' || !validateEmail) {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  }
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const successMessage = () => {
    return (
      <div className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h4>User {firstName} successfully registered!!</h4>
      </div>
    )
  }

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h6>Please enter all the fields</h6>
      </div>
    );
  };

  return (
    <div className="form">
      <h3>Create a new account</h3>
      <p>It’s quick and easy.</p>
      <hr />
      <div className="one-line">
        <input type="text" placeholder="First name" value={firstName} onChange={handleInputChange} id='firstName' />
        <input type="text" placeholder="Last name" value={lastName} onChange={handleInputChange} id='lastName' />
      </div>
      <input type="email" placeholder="email" value={email} onChange={handleInputChange} id='email' />
      <input type="password" placeholder="New password" value={password} onChange={handleInputChange} id='password' />
      <label>Birthday</label>
      <div className="one-line">
      <Select options={optionMonth} value={selectedMonth} onChange={handleSelectChange} placeholder="Month" className='Selected' id='month' />
<Select options={optionDay} value={selectedDay} onChange={handleSelectChange} placeholder="Day" className='Selected' id='day' />
<Select options={optionYear} value={selectedYear} onChange={handleSelectChange} placeholder="Year" className='Selected' id='year' />

      </div>
      <label>Gender</label>
      <div className="one-line">
        <div className="gender">
          <label>Female</label>
          <input type="radio" value="Female" name="gender" checked={selectedRadio === 'Female'} onChange={handleRadioChange} />
        </div>
        <div className="gender">
          <label>Male</label>
          <input type="radio" value="Male" name="gender" checked={selectedRadio === 'Male'} onChange={handleRadioChange} />
        </div>
        <div className="gender">
          <label>Custom</label>
          <input type="radio" value="Custom" name="gender" checked={selectedRadio === 'Custom'} onChange={handleRadioChange} />
        </div>
      </div>

      <button type="submit" className='btn btn-primary' onClick={handleSubmit} >Sign up</button>
      <a
        href="https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjgyNTM3OTIxLCJjYWxsc2l0ZV9pZCI6MjY5NTQ4NDUzMDcyMDk1MX0%3D"
        target="_blank">
        Already have an account?
      </a>
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
    </div>
  );
}
