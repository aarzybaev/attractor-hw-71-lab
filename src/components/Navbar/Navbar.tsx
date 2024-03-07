import React from 'react';
import {NavLink} from 'react-router-dom';
const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/admin" className="navbar-brand">Turtle pizza :: Admin</NavLink>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dishes">Dishes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;