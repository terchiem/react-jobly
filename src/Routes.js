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

/** All routes for the Jobly app */

function Routes() {
  const { token } = useContext(UserContext); // TEMP: switch to context user when implemented

  const loggedInRoutes = (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/companies'>
        <CompanyList />
      </Route>
      
      <Route exact path='/companies/:handle'> 
        <CompanyPage />
      </Route>
      
      <Route exact path='/jobs'> 
        <JobList /> 
      </Route>
      
      <Route exact path='/profile'> 
        <Profile /> 
      </Route>

      { /** Page not found */ }
      <Redirect exact to='/' />
    </Switch>
  );

  const loggedOutRoutes = (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>

      <Route exact path='/login'> 
        <Auth /> 
      </Route>
      
      { /** Page not found */ }
      <Redirect exact to='/' />
    </Switch>
  )

  return (token ? loggedInRoutes : loggedOutRoutes);
}

export default Routes;