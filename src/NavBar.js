import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from './UserContext';
import './NavBar.css';

/** 
 * Navigation component for the Jobly app. 
 * Changes depending if user is logged in. 
 * */

function NavBar({ logOut }) {

  const { token } = useContext(UserContext);

  const navLinks = token ? (
    <ul>
      <li><NavLink exact to='/companies'>Companies</NavLink></li>
      <li><NavLink exact to='/jobs'>Jobs</NavLink></li>
      <li><NavLink exact to='/profile'>Profile</NavLink></li>
      <li><Link to="/" onClick={logOut}>Log Out</Link></li>
    </ul>
  ) : (
    <ul>
      <li><NavLink exact to='/login'>Login</NavLink></li>
    </ul>
  )

  return (
    <nav className='NavBar'>
      <Link to='/' id='NavBar-logo'>Jobly</Link>

      { navLinks }
    </nav>
  )
}

export default NavBar;