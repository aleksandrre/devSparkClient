import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaTicketAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { register, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.fullname) {
      errors.fullname = "Full name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <FaTicketAlt className="auth-logo-icon" />
          </div>
          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">
            Register to access the ticket management system
          </p>
        </div>

        {error && (
          <div className="auth-error">
            <FaExclamationCircle className="error-icon" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="fullname" className="form-label">
              <FaUser className="form-icon" />
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              className={`form-input ${
                formErrors.fullname ? "input-error" : ""
              }`}
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              disabled={loading}
            />
            {formErrors.fullname && (
              <div className="error-message">{formErrors.fullname}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              <FaEnvelope className="form-icon" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${formErrors.email ? "input-error" : ""}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
            {formErrors.email && (
              <div className="error-message">{formErrors.email}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              <FaLock className="form-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-input ${
                formErrors.password ? "input-error" : ""
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
            />
            {formErrors.password && (
              <div className="error-message">{formErrors.password}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              <FaLock className="form-icon" />
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`form-input ${
                formErrors.confirmPassword ? "input-error" : ""
              }`}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
            />
            {formErrors.confirmPassword && (
              <div className="error-message">{formErrors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
