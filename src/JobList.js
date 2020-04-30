import React, { useState, useEffect, useContext } from 'react';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';
import './List.css';

// components
import SearchBar from './SearchBar';
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';

/** 
 * Displays a list of JobCard components from the jobs 
 * array kept in state. 
 * */

function JobList({ updateUserJobs }) {
  const { currentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all jobs from api on initial mount
  useEffect(() => {
    async function loadJobs() {
      const fetchedJobs = await JoblyApi.request('jobs');
      setJobs(fetchedJobs.jobs);
      setLoading(false);
    }
    setLoading(true);
    loadJobs();
  }, []);


  /** Search for jobs through the api. Sets results to state company array */
  async function searchJob(term) {
    setLoading(true);
    const foundJobs = await JoblyApi.request(`jobs?search=${term}`)
    setJobs(foundJobs.jobs);
    setLoading(false);
  }

  /** Creates a CompanyCard for each company object in state */
  function renderJobs() {
    return jobs.map(j => {
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
    }); 
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="List">
      <SearchBar search={searchJob} />
      { jobs.length ? renderJobs() : <p>Sorry, no results were found!</p> }
    </div>
  );
}

export default JobList;