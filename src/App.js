import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

// components
import NavBar from './NavBar';
import Routes from './Routes';

/** Top level component for Jobly App. */

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
