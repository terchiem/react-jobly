import React, { useState } from 'react';
import './Auth.css';

// components
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

/** Displays a form to log in or sign up */

function Auth({ setToken }) {

  const [showLoginForm, toggleLoginForm] = useState(true);

  return (
    <div className="Auth">
      <div className="Auth-toggle">
        <button 
          className={showLoginForm ? "Auth-active" : ""} 
          onClick={() => toggleLoginForm(true)}
        >
          Login
        </button>
        <button 
          className={showLoginForm ? "" : "Auth-active"} 
          onClick={() => toggleLoginForm(false)}
        >
          Sign up
        </button>
      </div>

      { 
        showLoginForm ? 
        <LoginForm setToken={setToken} /> : 
        <SignUpForm setToken={setToken} /> 
      }
    </div>
  );
}

export default Auth;