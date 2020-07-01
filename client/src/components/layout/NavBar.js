import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <h1>DayR8</h1>
        </Link>
        <Link className="navbar-brand" to="/emotions">
          <h1>Emotions</h1>
        </Link>
        <div className="icons">
          <i className="fas fa-save save-note"></i>
          <i className="fas fa-pen new-note"></i>
        </div>
      </nav>
    </div>
  );
}
