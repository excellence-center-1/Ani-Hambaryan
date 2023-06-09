import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { DateSelect } from "react-ymd-date-select/presets/mui";
import { handleInput } from '../Inputs/handleInput';
import { EmailInput } from '../Inputs/emailInput';
import { TextInput } from '../Inputs/textInputs';


export default function RegistrationForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        email: '',
      });

    const [startDate, setStartDate] = useState(new Date());
    const [selectedRadio, setSelectedRadio] = useState('');
    const { firstName, lastName, password, email } = formData;

    const handleInputChange = (e) => {
        handleInput(e, setFormData);
    };

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
      };

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (firstName === '' || lastName === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);
        }
    };


    const errorMessage = () => {
        return (
            <div className="error" style={{ display: error ? '' : 'none' }}>
                <h6>Please enter all the fields</h6>
            </div>
        );
    };

    return (
        <div className="form">
        <h1 className='text-primary'>Registration</h1>
            <h3>Create a new account</h3>
            <p>It’s quick and easy.</p>
            <hr />
            <div className="one-line">
                <TextInput placeholder="First name" value={firstName} onChange={handleInputChange} id='firstName' />
                <TextInput placeholder="Last name" value={lastName} onChange={handleInputChange} id='lastName' />
            </div>
            <EmailInput placeholder='email' value={email} onChange={handleInputChange} id='email' />
            <input type="password" placeholder="New password" value={password} onChange={handleInputChange} id='password' />
            <label>Birthday</label>
            <div className="one-line">
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} id='date' />
                {/* <DateSelect value={date} onChange={setDate} /> */}
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

            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                Sign up</button>
            <a href="https://www.facebook.com/login/?privacy_mutation_token=eyJ0eXBlIjowLCJjcmVhdGlvbl90aW1lIjoxNjgyNTM3OTIxLCJjYWxsc2l0ZV9pZCI6MjY5NTQ4NDUzMDcyMDk1MX0%3D" >
                Already have an account?
            </a>
            <div className="messages">
                {errorMessage()}
            </div>
        </div>
    );
}