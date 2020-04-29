import React, { useState } from 'react';
import './Auth.css';

// components
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

/** Displays a form to log in or sign up */

function Auth() {

  const [loginForm, toggleLoginForm] = useState(true);

  // TODO: conditional styling for current active form

  return (
    <div className="Auth">
      <div className="Auth-toggle">
        <button onClick={() => toggleLoginForm(true)}>Login</button>
        <button onClick={() => toggleLoginForm(false)}>Sign up</button>
      </div>

      { loginForm ? <LoginForm /> : <SignUpForm /> }
    </div>
  );
}

export default Auth;