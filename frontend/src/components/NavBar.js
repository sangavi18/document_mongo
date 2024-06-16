import React from 'react';
import { Link } from 'react-router-dom';
import'./NavBar.css';

const NavBar = () => {
  return (
    <nav>
    <div className="navbar">
    <div className="navbar-brand">DOCUMENT MANAGER</div>
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/document-manager">Document Manager</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      </div>
    </nav>

  );
};

export default NavBar;
