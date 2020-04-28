import React, { useState, useEffect } from 'react';

import CompanyCard from './CompanyCard';
import JoblyApi from './JoblyApi';

/** 
 * Displays a list of CompanyCard components from the companies
 * array kept in state.
 */

function CompanyList({ companyList }) {

  const [companies, setCompanies] = useState([]);

  // fetch all companies from back end on mount
  useEffect(() => {
    async function loadCompanies() {
      const fetchedCompanies = await JoblyApi.request('companies');
      setCompanies(fetchedCompanies.companies);
    }
    loadCompanies();
  }, []);

  /** Creates a CompanyCard for each company object in state */
  function renderCompanies() {
    console.log(companies);
    return companies.map(c => (
      <CompanyCard
        name={c.name}
        handle={c.handle}
        description={c.description}
        logoUrl={c.logo_url}
      />
    ))
  }

  return (
    <div className="CompanyList">
      <p>placeholder for searchbar</p>
      { renderCompanies() }
    </div>
  );
}

export default CompanyList;