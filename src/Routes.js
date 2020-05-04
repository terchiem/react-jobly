import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// components
import Home from './Home';
import CompanyList from './CompanyList';
import CompanyPage from './CompanyPage';
import JobList from './JobList';
import Auth from './Auth';
import Profile from './Profile';
import PrivateRoute from './PrivateRoute';

/** All routes for the Jobly app 
 * 
 * Props:
 *  setToken -> App function, used in Auth component
 *  setEditedUser -> App function, used in Profile component
 *  updateUserJobs -> App function, used in CompanyPage/JobList component
*/

function Routes({ setToken, setEditedUser, updateUserJobs }) {

  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/login'> 
        <Auth setToken={setToken} /> 
      </Route>

      <PrivateRoute exact={true} path='/companies'>
        <CompanyList />
      </PrivateRoute>
      
      <PrivateRoute exact={true} path='/companies/:handle'> 
        <CompanyPage updateUserJobs={updateUserJobs} />
      </PrivateRoute>
      
      <PrivateRoute exact={true} path='/jobs'> 
        <JobList updateUserJobs={updateUserJobs} /> 
      </PrivateRoute>
      
      <PrivateRoute exact={true} path='/profile'> 
        <Profile setEditedUser={setEditedUser} /> 
      </PrivateRoute>

      { /** Page not found */ }
      <Redirect exact to='/' />
    </Switch>
  );
}

export default Routes;