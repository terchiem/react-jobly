import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

/** 
 * Navigation component for the Jobly app. 
 * Changes depending if user is logged in. 
 * */

function NavBar() {

  return (
    <nav className='NavBar'>
      <Link to='/' className='NavBar-left'>Jobly</Link>

      <NavLink exact to='/companies'>Companies</NavLink>
      <NavLink exact to='/jobs'>Jobs</NavLink>
      <NavLink exact to='/login'>Login</NavLink>
      <NavLink exact to='/profile'>Profile</NavLink>
    </nav>
  )
}

export default NavBar;