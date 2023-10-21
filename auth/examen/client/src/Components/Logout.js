import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios';
import { getJwtTokenFromCookies } from '../utils/authUtils';

export const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout', { withCredentials: true }, {
        headers: {
          Authorization: `Bearer ${getJwtTokenFromCookies()}`,
        }
      });
      logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <Link to="/login" style={linkStyle}>
      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
    </Link>
  );
};
