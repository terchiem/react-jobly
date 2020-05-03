import React, { useState } from 'react';
import JoblyApi from './JoblyApi';
import './List.css';

// components
import CompanyCard from './CompanyCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

/** 
 * Displays a list of all available companies. A user can filter specific
 * companies with the SearchBar component.
 * 
 * State:
 *  companies -> array of companies received from api
 *  loading -> to display loading spinner while fetching companies
 */

function CompanyList() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  /** Search for companies through the api. Sets results to state company array */
  async function searchCompany(term) {
    setLoading(true);
    const foundCompanies = await JoblyApi.request(`companies?search=${term}`)
    setCompanies(foundCompanies.companies);
    setLoading(false);
  }

  /** Creates a CompanyCard for each company object in state */
  function renderCompanies() {
    return companies.length ? companies.map(c => (
      <CompanyCard
        key={c.handle}
        name={c.name}
        handle={c.handle}
        description={c.description}
        logoUrl={c.logo_url}
      />
    )) : (
      <p>Sorry, no results were found!</p>
    );
  }

  return (
    <div className="List">
      <SearchBar search={searchCompany} />
      { loading ? <LoadingSpinner /> : renderCompanies() }
    </div>
  );
}

export default CompanyList;