import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  FaTicketAlt,
  FaPlus,
  FaBars,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import "../../styles/components/navbar.css";

const Navbar = ({ onCreateTicket, onToggleSidebar }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="navbar-toggle-btn" onClick={onToggleSidebar}>
            <FaBars />
          </button>

          <div className="navbar-logo">
            <FaTicketAlt className="navbar-logo-icon" />
            <span className="navbar-logo-text">Ticket System</span>
          </div>
        </div>

        <div className="navbar-right">
          <button className="create-ticket-btn" onClick={onCreateTicket}>
            <FaPlus />
            <span>New Ticket</span>
          </button>

          <div className="user-profile">
            <div className="user-avatar">
              <FaUser />
            </div>
            <span className="user-name">{user?.fullname}</span>
          </div>

          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
