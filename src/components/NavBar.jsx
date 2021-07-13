import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/" className="navbar-brand">
        Vidly
      </NavLink>
      <div className="navbar-nav">
        <NavLink to="/movies" className="nav-item nav-link">
          Movies
        </NavLink>
        <NavLink to="/customers" className="nav-item nav-link">
          Customers
        </NavLink>
        <NavLink to="/rentals" className="nav-item nav-link">
          Rentals
        </NavLink>
        {user && (
          <>
            <NavLink to="/logout" className="nav-item nav-link">
              Logout
            </NavLink>
            <NavLink to="/me" className="nav-item nav-link">
              {user.name}
            </NavLink>
          </>
        )}
        {!user && (
          <>
            <NavLink to="/login" className="nav-item nav-link">
              Login
            </NavLink>
            <NavLink to="/register" className="nav-item nav-link">
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
