import React from 'react';
import './LoadingSpinner.css';

/** Loading animation that is displayed while data is loading */
function LoadingSpinner() {
  return (
    <div className="LoadingSpinner-container">
      <div className="LoadingSpinner"></div>
    </div>
  );
}

export default LoadingSpinner;