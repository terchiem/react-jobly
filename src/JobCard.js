import React from 'react';
import JoblyApi from './JoblyApi';
import './Card.css';

/** Displays a job's details and a button to apply for the job 
 * 
 * Props:
 *  id -> id of job
 *  company_handle -> handle of job's company
 *  title, salary, equity -> info about job
 *  applied -> whether or not current user has applied to job
 *  updateUserJob -> function to update current user's job list
*/

function JobCard({ 
  id, 
  company_handle, 
  title, 
  salary, 
  equity, 
  applied, 
  updateUserJobs 
}) {

  /** Create an application for a user and a job */
  async function applyForJob() {
    try {
      const state = await JoblyApi.applyForJob(id);

      // create job object to update currentUser state with
      const newJob = { id, company_handle, title, state }
      updateUserJobs(newJob);
    } catch (err) {
      console.error(err);
    }
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