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
import LoadingSpinner from './LoadingSpinner';

/** Top level component for Jobly App. */

function App() {

  const [token, setToken, removeToken] = useLocalStorage(TOKEN_STORAGE_KEY);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Call api to get user data from the token username, and set in state
  useEffect(() => {
    async function fetchUser() {
      try {
        const { username } = jwt.decode(token);
        const user = await JoblyApi.getUser(username);
        setCurrentUser(user);  
      } catch (err) {
        setCurrentUser(null);
      }
      setLoading(false);
    }
    setLoading(true);
    fetchUser()
  }, [token]);


  /** Logs out current user by removing the token from storage */
  function logOut() {
    removeToken();
    setCurrentUser(null);
  }

  /** Updates the currentUser to match the edited user received from api */
  function setEditedUser(editedUser) {
    setCurrentUser((user) => ({
      ...editedUser,
      jobs: user.jobs
    }));
  }

  /** Updates the currentUser's job list after applying for one */
  function updateUserJobs(job) {
    setCurrentUser(user => ({
      ...user,
      jobs: [...user.jobs, job]
    }));
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ currentUser, token }}>
        <BrowserRouter>
          <NavBar logOut={logOut} />
          <Routes 
            setToken={setToken} 
            removeToken={removeToken} 
            setEditedUser={setEditedUser} 
            updateUserJobs={updateUserJobs}
          />
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
