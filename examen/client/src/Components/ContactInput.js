import React, { useState } from 'react';

export const ContactInput = (props) => {
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');



  const validatePhone = (phone) => {
    const phoneRegex = /^\+374 \d{2} \d{6}$/;

    if (!phone.match(phoneRegex)) {
      setPhoneError('Please enter a valid phone number in the format +374 xx xxxxxx');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email.match(emailRegex)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleAddContact = () => {
    if (validatePhone(props.phone) && validateEmail(props.email)) {
      props.addContact();
      props.actionAddContact();
    }
  };

  const handleCancel = () => {
    props.setContact('');
    props.setPhone('');
    props.setEmail('');
    props.setGroup('Family');
    setPhoneError('');
    setEmailError('');
    props.actionAddContact(); 
  };

  return (
    <div className='input-wrapper'>
      <input
        type='text'
        name='contact'
        value={props.contact}
        placeholder='Create a new contact'
        onChange={(e) => {
          props.setContact(e.target.value);
        }}
      />
      <input
        type='text'
        name='phone_number'
        value={props.phone}
        placeholder='+374 xx xxxxxx'
        onChange={(e) => {
          props.setPhone(e.target.value);
        }}
      />
      {phoneError && <p className="error">{phoneError}</p>}
      <input
        type='text'
        name='email'
        value={props.email}
        placeholder='email@gemail.com'
        onChange={(e) => {
          props.setEmail(e.target.value);
        }}
      />
      {emailError && <p className="error">{emailError}</p>}
      <select
        name='group'
        value={props.group}
        onChange={(e) => {
          props.setGroup(e.target.value);
        }}
      >
        <option value='Family'>Family</option>
        <option value='Friends'>Friends</option>
        <option value='Work'>Work</option>
        <option value='Other'>Other</option>
      </select>
      <button className='add-contact-button' onClick={handleAddContact}>
        Add
      </button>
      <button className='cancel-contact-button' onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};
