

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDay, setSelectedDay] = useState('01');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedRadio, setRadio] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const optionMonth = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
  ]
  const optionDay = [
    { value: '01', label: '01' },
    { value: '02', label: '02' },
    { value: '03', label: '03' }
  ]
  const optionYear = [
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
    { value: '2002', label: '2002' }
  ]
  const handleInput = (e) => {
    const { id, value } = e.target;
  
    switch (id) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };
  
  const handleSelect = (selectedOption, id) => {
    switch (id) {
      case 'month':
        setSelectedMonth(selectedOption);
        break;
      case 'day':
        setSelectedDay(selectedOption);
        break;
      case 'year':
        setSelectedYear(selectedOption);
        break;
      default:
        break;
    }
  };
  
  const handleRadioChange = (e) => {
    setRadio(e.target.value);
  };
  
  // const handleFirstName = (e) => {
  //   setFirstName(e.target.value)
  // }
  // const handleLastName = (e) => {
  //   setLastName(e.target.value)
  // }
  // const handleEmail = (e) => {
  //   setEmail(e.target.value)
  // }
  // const handlePassword = (e) => {
  //   setPassword(e.target.value)
  // }
  // const handleSelectMonth = (option) => {
  //   setSelectedMonth(option);
  // };
  // const handleSelectDay = (option) => {
  //   setSelectedDay(option);
  // }
  // const handleSelectYear = (option) => {
  //   setSelectedYear(option)
  // }

  // const handleRadioChange = (e) => {
  //   setRadio(e.target.value);
  // };

  const handleSubmit = () => {
    if (firstName === '' || lastName === '' || email === '' || password === '' || selectedMonth === null || selectedRadio === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  }
  const validateEmail = (email) => {
    // Simple email validation regex pattern
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
        <input type="text" placeholder="First name" value={firstName} onChange={(e) => handleInput(e)} id='firstName' />
        <input type="text" placeholder="Last name" value={lastName} onChange={(e) => handleInput(e)} id='lastName' />
      </div>
      <input type="email" placeholder="email" value={email} onChange={(e) => handleInput(e)} id='email' />
      <input type="password" placeholder="New password" value={password} onChange={(e) => handleInput(e)} id='password' />
      <label>Birthday</label>
      <div className="one-line">
        <Select options={optionMonth} value={selectedMonth} onChange={(e) => handleSelect(e)} placeholder="Month" className='Selected' id = 'month' />
        <Select options={optionDay} value={selectedDay} onChange={(e) => handleSelect(e)} placeholder="Day" className='Selected' id = 'day' />
        <Select options={optionYear} value={selectedYear} onChange={(e) => handleSelect(e)} placeholder="Year" className='Selected' id = 'year' />
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
