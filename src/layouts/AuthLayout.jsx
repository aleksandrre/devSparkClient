import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages/auth.css";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-form-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
