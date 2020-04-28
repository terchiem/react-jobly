import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import './CompanyPage.css';

import JobCard from './JobCard';

/** Displays details about a company and all of its jobs */

function CompanyPage() {

  const { handle } = useParams();
  const [currentCompany, setCurrentCompany] = useState(null);

  // fetch data for a company when component mounts
  useEffect(() => {
    async function fetchCompany() {
      const fetchedCompany = await JoblyApi.getCompany(handle);
      setCurrentCompany(fetchedCompany);
    }
    fetchCompany();
  }, []);


  /** Creates a JobCard component for each company job */
  function renderCompanyJobs() {
    return currentCompany.jobs.map(j => (
      <JobCard 
        key={j.id}
        id={j.id}
        title={j.title}
        salary={j.salary}
        equity={j.equity}
        applied={false} // TODO: check against current user's jobs
      />
    ))
  }

  const companyPage = currentCompany ? (
    <div className="CompanyPage">
      <h2>{currentCompany.name}</h2>
      <p>{currentCompany.description}</p>
      { renderCompanyJobs() }
    </div>
  ) : <p>Loading...</p>

  return companyPage;
}

export default CompanyPage;