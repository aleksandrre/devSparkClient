import React from "react";
import { Link } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";
import "../styles/pages/not-found.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon-container">
          <FaExclamationTriangle className="not-found-icon" />
        </div>
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="back-home-button">
          <FaArrowLeft className="button-icon" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
