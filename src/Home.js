import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';
import './Home.css';

/** Displays a simple greeting to the user. Show a Login link if logged out. 
 * 
 * Context:
 *  currentUser -> universal current user object
*/

function Home() {
  const { currentUser } = useContext(UserContext); 

  return (
    <div className="Home">
      <h1>Jobly</h1>
      <p>
        { 
          currentUser ? 
          `Welcome back, ${currentUser.first_name || currentUser.username}!` : 
          <Link to="/login" className="Home-login">Login</Link>
        }
      </p>
    </div>
  );
}

export default Home;