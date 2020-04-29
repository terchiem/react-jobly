import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import { TOKEN_STORAGE_KEY } from './config';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

// components
import NavBar from './NavBar';
import Routes from './Routes';

/** Top level component for Jobly App. */

function App() {

  const [token, setToken, removeToken] = useLocalStorage(TOKEN_STORAGE_KEY);
  const [currentUser, setCurrentUser] = useState(null);
  

  // Call api to get user data from the token username, and set in state
  useEffect(() => {
    async function fetchUser() {
      const { username } = jwt.decode(token);
      const user = await JoblyApi.getUser(username);
      setCurrentUser(user);
    }

    if (token) { 
      fetchUser()
    } else {
      setCurrentUser(null);
    };
  }, [token]);


  /** Logs out current user by removing the token from storage */
  function logOut() {
    removeToken();
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, token }}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <Routes setToken={setToken} removeToken={removeToken} />
        </BrowserRouter>
      </UserContext.Provider>

      {/* DEBUG */}
      {`THE CURRENT USER IS: ${JSON.stringify(currentUser)}`}
    </div>
  );
}

export default App;
