import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
const Navbar: React.FC = () => {
  const location = useLocation();
  const isHome = (location.pathname === '/');
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        {isHome?
          <NavLink to="/" className="navbar-brand">Turtle pizza</NavLink> :
          <NavLink to="/admin" className="navbar-brand">Turtle pizza :: Admin</NavLink>
        }

        {!isHome && <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/dishes">Dishes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin/orders">Orders</NavLink>
            </li>
          </ul>
        </div>}
      </div>
    </nav>
  );
};

export default Navbar;