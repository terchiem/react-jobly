import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import './Form.css';

/** Form component for a user to sign in. 
 * 
 * Props:
 *  setToken -> App component state setter for token
 * 
 * State:
 *  formData -> state for each input on the form
*/

function SignUpForm({ setToken }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    errors: []
  });

  /** Updates state on input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({...data, [name]: value}));
  }

  /** Creates a new user and stores the token in localStorage */
  async function signUp(evt) {
    evt.preventDefault();
    
    try {
      const token = await JoblyApi.signUp(formData);
      setToken(token);
      history.push("/jobs");  // redirect to '/jobs'
    } catch (errors) {
      // fill formData errors array to display
      setFormData(data => ({...data, errors}));
    }
  }

  /** Renders form errors if present */
  function renderErrors() {
    return (formData.errors.length ?
      <ul className="Form-errors">
        {formData.errors.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul> : null
    )
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

      { renderErrors() }
    </form>
  )
}

export default SignUpForm;