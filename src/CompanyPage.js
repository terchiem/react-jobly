import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import UserContext from './UserContext';
import './List.css';

// components
import JobCard from './JobCard';

/** Displays details about a company and all of its jobs 
 * 
 * Props:
 *  updateUserJobs -> function used to apply for a job
 * 
 * Context:
 *  currentUser -> universal current user object
 * 
 * State:
 *  currentCompany -> company fetched by api with current url params
*/

function CompanyPage({ updateUserJobs }) {
  const { currentUser } = useContext(UserContext);
  const { handle } = useParams();
  const [currentCompany, setCurrentCompany] = useState(null);

  // fetch data for a company when component mounts
  useEffect(() => {
    async function fetchCompany() {
      const fetchedCompany = await JoblyApi.getCompany(handle);
      setCurrentCompany(fetchedCompany);
    }
    fetchCompany();
  }, [handle]);


  /** Creates a JobCard component for each company job */
  function renderCompanyJobs() {
    return currentCompany.jobs.map(j => {
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
        company_handle={j.company_handle}
        title={j.title}
        salary={j.salary}
        equity={j.equity}
        applied={applied}
        updateUserJobs={updateUserJobs}
      />;
    })
  }

  const companyPage = currentCompany ? 
    <div className="List">
      <h2>{currentCompany.name}</h2>
      <p>{currentCompany.description}</p>
      { renderCompanyJobs() }
    </div> :
    <div className="CompanyPage">
      <p>Loading...</p>
    </div>

  return companyPage;
}

export default CompanyPage;