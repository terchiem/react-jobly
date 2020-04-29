import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TOKEN_STORAGE_KEY } from './config';
import UserContext from './UserContext';
import './NavBar.css';

/** 
 * Navigation component for the Jobly app. 
 * Changes depending if user is logged in. 
 * */

function NavBar() {

  const { token, setToken } = useContext(UserContext);  // TEMP: switch to context user when implemented
  
  /** Log out current user */
  function logout() {
    setToken(null);
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  }

  const navLinks = token ? (
    <ul>
      <li><NavLink exact to='/companies'>Companies</NavLink></li>
      <li><NavLink exact to='/jobs'>Jobs</NavLink></li>
      <li><NavLink exact to='/profile'>Profile</NavLink></li>
      <li><Link to="/" onClick={logout}>Log Out</Link></li>
    </ul>
  ) : (
    <ul>
      <li><NavLink exact to='/login'>Login</NavLink></li>
    </ul>
  )

  return (
    <nav className='NavBar'>
      <Link to='/' className='NavBar-left'>Jobly</Link>

      { navLinks }
    </nav>
  )
}

export default NavBar;