import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

/** Displays a simple greeting to the user. Show a Login link if logged out. */

function Home() {
  const { token } = useContext(UserContext); // TEMP: switch to user when implemented

  return (
    <div className="Home">
      <p>
        { token ? 'Welcome back!' : 'Welcome to Jobly!'}
      </p>

      { token ? null : <Link to="/login" className="Home-login">Login</Link>}
    </div>
  );
}

export default Home;