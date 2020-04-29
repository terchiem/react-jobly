import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { TOKEN_STORAGE_KEY } from './config';
import UserContext from './UserContext';
import './App.css';

// components
import NavBar from './NavBar';
import Routes from './Routes';

/** Top level component for Jobly App. */

function App() {

  const [token, setToken] = useState(null);
  
  // TODO: store current user data in state
  // TODO: update current user when token is changed

  
  // Use token from previous session if present in localStorage
  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_STORAGE_KEY);
    setToken(storedToken);
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
