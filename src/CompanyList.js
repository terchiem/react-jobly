import React, { useState, useEffect } from 'react';
import './CompanyList.css';

import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import JoblyApi from './JoblyApi';

/** 
 * Displays a list of CompanyCard components from the companies
 * array kept in state.
 */

function CompanyList() {

  const [companies, setCompanies] = useState([]);

  // fetch all companies from api on initial mount
  useEffect(() => {
    async function loadCompanies() {
      const fetchedCompanies = await JoblyApi.request('companies');
      setCompanies(fetchedCompanies.companies);
    }
    loadCompanies();
  }, []);


  /** Search for companies through the api. Sets results to state company array */
  async function searchCompany(term) {
    const foundCompanies = await JoblyApi.request(`companies?search=${term}`)
    setCompanies(foundCompanies.companies);
  }

  /** Creates a CompanyCard for each company object in state */
  function renderCompanies() {
    return companies.map(c => (
      <CompanyCard
        key={c.handle}
        name={c.name}
        handle={c.handle}
        description={c.description}
        logoUrl={c.logo_url}
      />
    )); 
  }

  return (
    <div className="CompanyList">
      <SearchBar search={searchCompany} />
      { companies.length ? renderCompanies() : <p>Sorry, no results were found!</p> }
    </div>
  );
}

export default CompanyList;