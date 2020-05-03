import React, { useState, useContext } from 'react';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';
import './List.css';

// components
import SearchBar from './SearchBar';
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';

/** 
 * Displays a list of JobCard components from the jobs array kept in state. 
 * 
 * Props:
 *  updateUserJobs -> function to update current user's job list
 * 
 * Context:
 *  currentUser -> universal current user object
 * 
 * State:
 *  jobs -> array of jobs fetched from api
 *  loading -> toggle display of loading spinner while fetching data
 * */

function JobList({ updateUserJobs }) {
  const { currentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  /** Search for jobs through the api. Sets results to state company array */
  async function searchJob(term) {
    setLoading(true);
    const foundJobs = await JoblyApi.request(`jobs?search=${term}`)
    setJobs(foundJobs.jobs);
    setLoading(false);
  }

  /** Creates a CompanyCard for each company object in state */
  function renderJobs() {
    return jobs.length ? (jobs.map(j => {
      // check if currentUser has applied to job
      const applied = currentUser.jobs.some(userJob => {
        if (userJob.id === j.id) {
          return userJob.state === "applied";
        }
        return false;
      })

      return <JobCard
        key={j.id}
        id={j.id}
        title={j.title}
        company_handle={j.company_handle}
        salary={j.salary}
        equity={j.equity}
        applied={applied}
        updateUserJobs={updateUserJobs}
      />;
    })) : (
      <p>Sorry, no results were found!</p> 
    ); 
  }

  return (
    <div className="List">
      <SearchBar search={searchJob} />
      { loading ? <LoadingSpinner /> : renderJobs() }
    </div>
  );
}

export default JobList;