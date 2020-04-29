import React from 'react';
import './Card.css';

/** Displays a job's details and a button to apply for the job */

function JobCard({ id, title, salary, equity, applied }) {

  /** Create an application for a user and a job */
  function applyForJob() {
    // TODO: use job id and current user name to make application
  }

  return (
    <div className="Card JobCard">
      <h3>{title}</h3>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
      <button className="JobCard-apply" onClick={applyForJob} disabled={applied}>
        {applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  )
}

export default JobCard;