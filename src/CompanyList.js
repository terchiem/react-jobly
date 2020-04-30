import React, { useState, useEffect } from 'react';
import JoblyApi from './JoblyApi';
import './List.css';

// components
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

/** 
 * Displays a list of all available companies. A user can filter specific
 * companies with the SearchBar component.
 */

function CompanyList() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all companies from api on initial mount
  useEffect(() => {
    async function loadCompanies() {
      const fetchedCompanies = await JoblyApi.request('companies');
      setCompanies(fetchedCompanies.companies);
      setLoading(false);
    }
    setLoading(true);
    loadCompanies();
  }, []);

  // TODO: loading display
    // chrome - simulate load time

  /** Search for companies through the api. Sets results to state company array */
  async function searchCompany(term) {
    setLoading(true);
    const foundCompanies = await JoblyApi.request(`companies?search=${term}`)
    setCompanies(foundCompanies.companies);
    setLoading(false);
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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="List">
      <SearchBar search={searchCompany} />
      { companies.length ? renderCompanies() : <p>Sorry, no results were found!</p> }
    </div>
  );
}

export default CompanyList;