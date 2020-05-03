import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';
import JoblyApi from './JoblyApi';
import './Profile.css';

import LoadingSpinner from './LoadingSpinner';

/** Displays a user's details as a form that allows the user to edit 
 * 
 * Props:
 *  setEditedUser -> function from App to set newly edited user as currentUser
 * 
 * Context:
 *  currentUser -> universal current user object
 * 
 * State:
 *  formData -> state for form inputs
*/

function Profile({ setEditedUser }) {
  const { currentUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    photo_url: "",
    errors: []
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  // when currentUser data has loaded, set the formData values
  useEffect(() => {
    setFormData({
      password: "",
      first_name: currentUser.first_name || "",
      last_name: currentUser.last_name || "",
      email: currentUser.email || "",
      photo_url: currentUser.photo_url || "",
      errors: []
    });
  }, [currentUser]);

  /** Update state on input change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({...data, [name]: value}));
    setUpdateSuccess(false);
  }

  /** Call api to log in, stores token in local storage and updates state */
  async function editUser(evt) {
    evt.preventDefault();
    
    try {
      const editedUser = await JoblyApi.editUser(currentUser.username, formData);
      setEditedUser(editedUser);
      setUpdateSuccess(true);
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

  if (!currentUser) {
    return <LoadingSpinner />;
  }

  return ( 
    <div className="Profile">
      <form className="Form" onSubmit={editUser}>
        <h2>Edit Profile</h2>
        <div className="Form-group">
          <h3>Username</h3>
          <p>{currentUser.username}</p>
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
        <div className="Form-group">
          <label className="Form-label" htmlFor="photo_url">Photo URL</label>
          <input
            className="Form-input" 
            id="photo_url" 
            name="photo_url" 
            value={formData.photo_url} 
            onChange={handleChange} 
          />
        </div>
        <div className="Form-group">
          <label htmlFor="password" className="Form-label">Confirm Password</label>
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
        { updateSuccess ? <div className="Form-success">Saved changes!</div> : null }
      </form>
    </div> 
  )
}

export default Profile;