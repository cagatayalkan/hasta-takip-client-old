import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Kaş Kardiyoloji Kliniği</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/createPatient" className="nav-link">Hasta Kayıt</Link>
          </li>
          <li className="navbar-item">
          <Link to="/report" className="nav-link">Raporlar</Link>
          </li>
          
        </ul>
        </div>
      </nav>
    );
  }
}