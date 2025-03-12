import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (token) {
        try {
          const userData = JSON.parse(localStorage.getItem("user"));
          if (userData) {
            setUser(userData);
          } else {
            logout();
          }
        } catch (err) {
          console.error("Auth verification error:", err);
          logout();
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      const { token, user } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      navigate("/dashboard");
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await authService.register(userData);
      navigate("/login");
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
