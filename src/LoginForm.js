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

function LoginForm({ setToken }) {
  const history = useHistory();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    errors: []
  });

  /** Update state on input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({...data, [name]: value}));
  }

  /** Call api to log in, stores token in local storage and updates state */
  async function logIn(evt) {
    evt.preventDefault();
    
    try {
      const token = await JoblyApi.logIn(formData);
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
    <form className="Form" onSubmit={logIn}>
      <div className="Form-group">
        <label htmlFor="username" className="Form-label">Username</label>
        <input 
          className="Form-input"
          id="username" 
          name="username" 
          value={formData.username} 
          onChange={handleChange} 
        />
      </div>
      <div className="Form-group">
        <label htmlFor="password" className="Form-label">Password</label>
        <input 
          className="Form-input"
          id="password" 
          name="password" 
          type="password"
          value={formData.password} 
          onChange={handleChange} 
        />
      </div>
      <button className="Form-submit">Submit</button>

      { renderErrors() }
    </form>
  )
}

export default LoginForm;