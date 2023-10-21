// NavBar.js
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../utils/AuthContext';
import { Logout } from './Logout';

export const NavBar = (props) => {

  const { isAuthenticated } = useAuth();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {isAuthenticated ? (
            <>
              <Logout />
              <Nav.Link href="#">{`${props.email}`}</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/registration">Register</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
