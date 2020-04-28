import React from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css';

/** Displays basic info about a company */
function CompanyCard({ name, handle, description, logoUrl }) {
  return (
    <Link exact to={`/companies/${handle}`}>
      <div className="CompanyCard">
        <h3>{name}</h3>
        <p>{description}</p>
        <img src={logoUrl} alt={`${name} Logo`}/>
      </div>
    </Link>
  )
}

export default CompanyCard;