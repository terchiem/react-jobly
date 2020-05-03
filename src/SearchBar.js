import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import './SearchBar.css';

/** Search bar component to search for a Company or Job 
 * 
 * Props:
 *  search -> search function from parent JobList/CompanyList component
 * 
 * State:
 *  searchTerm -> state for text input, sent to search function
 * 
 * Ref:
 *  debouncedSearch -> for use of live searches
*/

function SearchBar({ search }) {  

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useRef(
    _.debounce(term => search(term), 500)
  ).current;

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm);
    setSearchTerm('');
  }

  /** Update input search term */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  // call debounced search on searchTerm update
  useEffect(function callSearch() {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input 
        className="SearchBar-input" 
        placeholder="Search term..."
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  )
}

export default SearchBar;