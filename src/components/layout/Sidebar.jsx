import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaList,
  FaTicketAlt,
  FaLock,
  FaCheckCircle,
  FaHandPaper,
  FaTimes,
} from "react-icons/fa";
import { useTickets } from "../../context/TicketContext";
import "../../styles/components/sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { currentFilter, changeFilter } = useTickets();

  const handleFilterChange = (filter) => {
    changeFilter(filter);
  };

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">Navigation</h2>
        <button className="sidebar-close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `sidebar-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => handleFilterChange("all")}
          >
            <FaList className="sidebar-icon" />
            <span>All Tickets</span>
          </NavLink>
        </li>

        <li className="sidebar-menu-item">
          <NavLink
            to="/not-done"
            className={({ isActive }) =>
              `sidebar-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => handleFilterChange("not-done")}
          >
            <FaTicketAlt className="sidebar-icon" />
            <span>Unhandled Tickets</span>
          </NavLink>
        </li>

        <li className="sidebar-menu-item">
          <NavLink
            to="/blocked"
            className={({ isActive }) =>
              `sidebar-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => handleFilterChange("blocked")}
          >
            <FaLock className="sidebar-icon" />
            <span>My Locked Tickets</span>
          </NavLink>
        </li>

        <li className="sidebar-menu-item">
          <NavLink
            to="/done"
            className={({ isActive }) =>
              `sidebar-menu-link ${isActive ? "active" : ""}`
            }
            onClick={() => handleFilterChange("done")}
          >
            <FaCheckCircle className="sidebar-icon" />
            <span>My Handled Tickets</span>
          </NavLink>
        </li>

        <li className="sidebar-menu-item">
          <NavLink
            to="/handle"
            className={({ isActive }) =>
              `sidebar-menu-link handle-link ${isActive ? "active" : ""}`
            }
          >
            <FaHandPaper className="sidebar-icon" />
            <span>Handle Next Ticket</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
