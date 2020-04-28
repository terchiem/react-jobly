import React from 'react';
import { Link } from 'react-router-dom';
import defaultLogo from './defaultLogo.png';
import './CompanyCard.css';

/** Displays basic info about a company */
function CompanyCard({ name, handle, description, logoUrl }) {
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard-link">
      <div className="CompanyCard">
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
          <img src={logoUrl || defaultLogo} alt={`${name} Logo`}/>
        </div>
      </div>
    </Link>
  )
}

export default CompanyCard;