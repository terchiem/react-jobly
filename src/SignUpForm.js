import React, { useState } from 'react';
import './Form.css';

/** Form component for a user to sign in. */

function SignUpForm({ signUp }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: ""
  });

  /** Updates state on input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({...data, [name]: value}));
  }

  /** Creates a new user and stores the token in localStorage */
  function signUp() {
    // TODO: api call to create user
      // store token in localStorage
      // redirect to jobs page
  }

  return (
    <form className="Form" onSubmit={signUp}>
      <div className="Form-group">
        <label className="Form-label" htmlFor="username">Username</label>
        <input
          className="Form-input" 
          id="username" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
        />
      </div>
      <div className="Form-group">
        <label className="Form-label" htmlFor="password">Password</label>
        <input
          className="Form-input" 
          id="password" 
          name="password" 
          type="password"
          value={formData.password} 
          onChange={handleChange} 
        />
      </div>
      <div className="Form-group">
        <label className="Form-label" htmlFor="first_name">First name</label>
        <input
          className="Form-input" 
          id="first_name" 
          name="first_name" 
          value={formData.first_name} 
          onChange={handleChange} 
        />
      </div>
      <div className="Form-group">
        <label className="Form-label" htmlFor="last_name">Last name</label>
        <input
          className="Form-input" 
          id="last_name" 
          name="last_name" 
          value={formData.last_name} 
          onChange={handleChange} 
        />
      </div>
      <div className="Form-group">
        <label className="Form-label" htmlFor="email">Email</label>
        <input
          className="Form-input" 
          id="email" 
          name="email" 
          type="email"
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>
      <button className="Form-submit">Submit</button>
    </form>
  )
}

export default SignUpForm;