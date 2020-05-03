import React, { useState } from 'react';
import './SearchBar.css';

/** Search bar component to search for a Company or Job 
 * 
 * Props:
 *  search -> search function from parent JobList/CompanyList component
 * 
 * State:
 *  searchTerm -> state for text input, sent to search function
*/

function SearchBar({ search }) {  

  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm);
    setSearchTerm('');
  }

  // TODO: debounce the search
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input 
        className="SearchBar-input" 
        placeholder="Search term..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="SearchBar-button">Search</button>
    </form>
  )
}

export default SearchBar;