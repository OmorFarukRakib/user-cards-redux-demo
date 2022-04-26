import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {
  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? "white" : "black",
      opacity: isActive ? 1 : 0.8,
      fontWeight: isActive ? "bold" : "normal",
      fontSize: isActive ? "1.5rem" : "0.7rem",
      border: "1px solid lightgrey",
      borderBottom: isActive ? "none" : "1px solid lightgrey",
      transform: isActive ? "translateY(0.8rem)" : "translateY(0px)",
      textDecoration: "none",
      padding: "15px 15px",
    };
  };

  return (
    <div>
      <nav className="navbar">
        <NavLink style={navLinkStyles} to="/admin">
          Admin
        </NavLink>
        <NavLink style={navLinkStyles} to="/employee">
          Employee
        </NavLink>
      </nav>
    </div>
  );
};
