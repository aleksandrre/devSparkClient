import React, { useState } from "react";
import {
  FaLock,
  FaCheck,
  FaRedo,
  FaChevronDown,
  FaChevronUp,
  FaClock,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { formatDate } from "../../utils/formatDate";
import "../../styles/components/ticket.css";

const TicketCard = ({ ticket, onLock, onHandle, onSkip }) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const isLockedByCurrentUser = ticket.userId === user?.id;

  const getStatusBadge = () => {
    switch (ticket.status) {
      case "open":
        return <span className="status-badge status-open">Open</span>;
      case "blocked":
        return <span className="status-badge status-blocked">Blocked</span>;
      case "done":
        return <span className="status-badge status-done">Done</span>;
      default:
        return null;
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`ticket-card ${isExpanded ? "expanded" : ""}`}>
      <div className="ticket-header">
        <div className="ticket-title-section">
          <h3 className="ticket-title">{ticket.title}</h3>
          {getStatusBadge()}
        </div>

        <button className="ticket-expand-btn" onClick={toggleExpand}>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      <div className="ticket-meta">
        <div className="ticket-meta-item">
          <FaCalendarAlt className="ticket-meta-icon" />
          <span className="ticket-meta-text">
            Created: {formatDate(ticket.createdAt)}
          </span>
        </div>

        {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
          <div className="ticket-meta-item">
            <FaClock className="ticket-meta-icon" />
            <span className="ticket-meta-text">
              Updated: {formatDate(ticket.updatedAt)}
            </span>
          </div>
        )}

        {ticket.status === "blocked" && (
          <div className="ticket-meta-item">
            <FaUser className="ticket-meta-icon" />
            <span className="ticket-meta-text">
              {isLockedByCurrentUser
                ? "Locked by you"
                : "Locked by another user"}
            </span>
          </div>
        )}
      </div>

      <div className={`ticket-body ${isExpanded ? "show" : ""}`}>
        <div className="ticket-description">
          <p>{ticket.description}</p>
        </div>

        {ticket.comments && ticket.comments.length > 0 && (
          <div className="ticket-comments">
            <h4 className="comments-title">Comments</h4>
            <ul className="comments-list">
              {ticket.comments.map((comment, index) => (
                <li key={index} className="comment-item">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="ticket-actions">
        {ticket.status === "open" && (
          <button
            className="ticket-action-btn lock-btn"
            onClick={() => onLock(ticket._id)}
          >
            <FaLock className="btn-icon" />
            <span>Lock</span>
          </button>
        )}

        {ticket.status === "blocked" && isLockedByCurrentUser && (
          <>
            <button
              className="ticket-action-btn handle-btn"
              onClick={() => onHandle(ticket._id)}
            >
              <FaCheck className="btn-icon" />
              <span>Handle</span>
            </button>
            <button
              className="ticket-action-btn skip-btn"
              onClick={() => onSkip(ticket._id)}
            >
              <FaRedo className="btn-icon" />
              <span>Skip</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
