import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

/** Displays a simple greeting to the user. Show a Login link if logged out. */

function Home() {
  const { currentUser } = useContext(UserContext); // TEMP: switch to user when implemented

  return (
    <div className="Home">
      <p>
        { 
          currentUser ? 
          `Welcome back, ${currentUser.first_name || currentUser.username}!` : 
          'Welcome to Jobly!'
        }
      </p>

      { currentUser ? null : <Link to="/login" className="Home-login">Login</Link>}
    </div>
  );
}

export default Home;