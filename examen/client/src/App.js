//App.js
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Desktop } from './Pages/Desktop';
import { NavBar } from './Components/NavBar';
import { Logout } from './Components/Logout';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import './App.css';
import { getJwtTokenFromCookies } from './utils/authUtils';
import axios from 'axios';
import { AuthProvider } from './utils/AuthContext';
import { MyContacts } from './Pages/MyContacts';

function App() {
  const isAuthenticated = getJwtTokenFromCookies() ? true : false;
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  console.log(process.env.REACT_APP_API_URL)
  const [userInfo, setUserInfo] = useState('')
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`users/info`, {
          headers: {
            Authorization: `Bearer ${getJwtTokenFromCookies()}`,
          },
        });
        setUserInfo(response.data);
        console.log("res", response.data)
      } catch (error) {
        console.error("Error fetching user info:", error);
      };
    }
    if (isAuthenticated) {
      fetchUserInfo();
    } else {
      setUserInfo("")
    }
  }, []);



  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar email={userInfo.email} />
        <div className='App'>
          <Routes>
            <Route path="/" element={<Desktop name={userInfo.name} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/contact" element={<MyContacts />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
