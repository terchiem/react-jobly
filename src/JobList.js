import React, { useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';
import './JobList.css';

// components
import SearchBar from './SearchBar';
import JobCard from './JobCard';

/** 
 * Displays a list of JobCard components from the jobs 
 * array kept in state. 
 * */

function JobList() {

  const [jobs, setJobs] = useState([]);

  // fetch all jobs from api on initial mount
  useEffect(() => {
    async function loadJobs() {
      const fetchedJobs = await JoblyApi.request('jobs');
      setJobs(fetchedJobs.jobs);
    }
    loadJobs();
  }, []);


  /** Search for jobs through the api. Sets results to state company array */
  async function searchJob(term) {
    const foundJobs = await JoblyApi.request(`jobs?search=${term}`)
    setJobs(foundJobs.jobs);
  }

  /** Creates a CompanyCard for each company object in state */
  function renderJobs() {
    return jobs.map(j => (
      <JobCard
        key={j.id}
        id={j.id}
        title={j.title}
        salary={j.salary}
        equity={j.equity}
        applied={false} // TODO: check against user's jobs
      />
    )); 
  }

  return (
    <div className="JobList">
      <SearchBar search={searchJob} />
      { jobs.length ? renderJobs() : <p>Sorry, no results were found!</p> }
    </div>
  );
}

export default JobList;