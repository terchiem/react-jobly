import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import CompanyList from './CompanyList';
import CompanyPage from './CompanyPage';
import JobList from './JobList';
import Auth from './Auth';
import Profile from './Profile';


/** All routes for the Jobly app */

function Routes() {
  return (
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
      
      <Route exact path='/login'> 
        <Auth /> 
      </Route>
      
      <Route exact path='/profile'> 
        <Profile /> 
      </Route>
      
      <Redirect exact path='/' />
    </Switch>
  )
}

export default Routes;