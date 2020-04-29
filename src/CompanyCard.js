import React from 'react';
import { Link } from 'react-router-dom';
import defaultLogo from './defaultLogo.png';
import './Card.css';

/** Displays basic info about a company */
function CompanyCard({ name, handle, description, logoUrl }) {
  return (
    <Link to={`/companies/${handle}`} className="CompanyCard-link">
      <div className="Card CompanyCard">
        <h3>{name}</h3>
        <p>{description}</p>
        <img src={logoUrl || defaultLogo} alt={`${name} Logo`}/>
      </div>
    </Link>
  )
}

export default CompanyCard;