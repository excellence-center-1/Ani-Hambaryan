import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Profile } from './components/Profile';
import {Login} from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Profile/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
