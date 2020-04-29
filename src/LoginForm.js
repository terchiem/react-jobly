import React, { useState } from 'react';
import './Form.css';

/** Form component for a user to sign in. */

function LoginForm({ logIn }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });


  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({...data, [name]: value}));
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
    </form>
  )
}

export default LoginForm;