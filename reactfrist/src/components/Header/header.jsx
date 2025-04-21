import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import "./header.scss";
import PATHS from "../../constants/pathConstants";
import axios from "axios";

function Header({user,setUser }) {
  const navigate = useNavigate(); // Correct use of useNavigate
  const location = useLocation();
  

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/user", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const handleLogout = async () => {
    try {
      axios
        .get("http://localhost:3001/auth/logout", { withCredentials: true })
        .then(() => setUser(null)) // Reset user on logout
        .catch((err) => console.error("Error signing out:", err));
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };


  return (
    <header className="header">
      <Link
        to={PATHS.DASHBOARD}
        className={`header__logo ${location.pathname === PATHS.DASHBOARD ? "active" : ""}`}
      >
        Cloud Storage
      </Link>
      <nav className="header__nav">
        <Link
          to={PATHS.DASHBOARD}
          className={`header__nav-link ${location.pathname === PATHS.DASHBOARD ? "active" : ""}`}
        >
          Dashboard
        </Link>
        <Link
          to={PATHS.STORAGEMAIN}
          className={`header__nav-link ${location.pathname === PATHS.STORAGEMAIN ? "active" : ""}`}
        >
          Storage
        </Link>
        <Link
          to={PATHS.PLAN}
          className={`header__nav-link ${location.pathname === PATHS.PLAN ? "active" : ""}`}
        >
          Plan
        </Link>
        <Link
          to={PATHS.API}
          className={`header__nav-link ${location.pathname === PATHS.API ? "active" : ""}`}
        >
          API
        </Link>
        <Link
          to={PATHS.DOCUMENTATION}
          className={`header__nav-link ${location.pathname === PATHS.DOCUMENTATION ? "active" : ""}`}
        >
          Documentation
        </Link>
      </nav>
      <div className="header__auth">
        {user && user !=null ? (
          <>
            <span className="header__auth-user">{user.displayName}</span>
            <button className="header__auth-button" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <Link to={PATHS.LOGIN} className="header__auth-button">
            Get Started
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
