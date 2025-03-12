import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaTicketAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const { login, loading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await login(formData.email, formData.password);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <FaTicketAlt className="auth-logo-icon" />
          </div>
          <h1 className="auth-title">Login to your account</h1>
          <p className="auth-subtitle">
            Enter your credentials to access your account
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

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
