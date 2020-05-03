import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserContext from './UserContext';

// components
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyPage from './CompanyPage';
import JobList from './JobList';
import Auth from './Auth';
import Profile from './Profile';

/** All routes for the Jobly app 
 * 
 * Props:
 *  setToken -> App function, used in Auth component
 *  setEditedUser -> App function, used in Profile component
 *  updateUserJobs -> App function, used in CompanyPage/JobList component
 * 
 * Context:
 *  token -> stored user session token from localStorage
*/

function Routes({ setToken, setEditedUser, updateUserJobs }) {
  const { token } = useContext(UserContext); 

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/login'> 
        <Auth setToken={setToken} /> 
      </Route>


      {/* Protected routes */}
      { token ? (
        <>
          <Route exact path='/companies'>
            <CompanyList />
          </Route>
          
          <Route exact path='/companies/:handle'> 
            <CompanyPage updateUserJobs={updateUserJobs} />
          </Route>
          
          <Route exact path='/jobs'> 
            <JobList updateUserJobs={updateUserJobs} /> 
          </Route>
          
          <Route exact path='/profile'> 
            <Profile setEditedUser={setEditedUser} /> 
          </Route>
        </>
      ) : null}
      {/* End protected routes */}
      
      
      { /** Page not found */ }
      <Redirect exact to='/' />
    </Switch>
  );
}

export default Routes;