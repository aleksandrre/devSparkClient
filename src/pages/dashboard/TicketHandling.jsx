import React, { useState, useEffect } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaRedo,
  FaExclamationCircle,
} from "react-icons/fa";
import { useTickets } from "../../context/TicketContext";
import { formatDate } from "../../utils/formatDate";
import "../../styles/pages/dashboard.css";

const TicketHandling = () => {
  const { getNextAvailableTicket, handleTicket, skipTicket, loading, error } =
    useTickets();
  const [currentTicket, setCurrentTicket] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  useEffect(() => {
    const savedTicket = localStorage.getItem("currentHandlingTicket");
    if (savedTicket) {
      try {
        setCurrentTicket(JSON.parse(savedTicket));
      } catch (err) {
        console.error("Error parsing saved ticket:", err);
        localStorage.removeItem("currentHandlingTicket");
      }
    }
  }, []);

  const handleGetNextTicket = async () => {
    setActionLoading(true);
    setActionError(null);

    try {
      const nextTicket = await getNextAvailableTicket();
      setCurrentTicket(nextTicket);

      if (nextTicket) {
        localStorage.setItem(
          "currentHandlingTicket",
          JSON.stringify(nextTicket)
        );
      } else {
        setActionError("No available tickets found.");
        localStorage.removeItem("currentHandlingTicket");
      }
    } catch (err) {
      setActionError("Failed to get the next ticket. Please try again.");
      console.error("Error getting next ticket:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteTicket = async () => {
    if (!currentTicket) return;

    setActionLoading(true);
    setActionError(null);

    try {
      await handleTicket(currentTicket._id);
      setCurrentTicket(null);
      localStorage.removeItem("currentHandlingTicket");
    } catch (err) {
      setActionError("Failed to handle the ticket. Please try again.");
      console.error("Error handling ticket:", err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleSkipTicket = async () => {
    if (!currentTicket) return;

    setActionLoading(true);
    setActionError(null);

    try {
      await skipTicket(currentTicket._id);
      setCurrentTicket(null);
      localStorage.removeItem("currentHandlingTicket");
    } catch (err) {
      setActionError("Failed to skip the ticket. Please try again.");
      console.error("Error skipping ticket:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="page-header"></div>

      {(error || actionError) && (
        <div className="error-alert">
          <FaExclamationCircle className="error-icon" />
          <span>{error || actionError}</span>
        </div>
      )}

      <div className="ticket-handling-container">
        {!currentTicket ? (
          <div className="no-ticket-container">
            <div className="no-ticket-message">
              <h3>Get the next available ticket</h3>
            </div>

            <button
              onClick={handleGetNextTicket}
              className="get-next-btn"
              disabled={loading || actionLoading}
            >
              {actionLoading ? "Getting Next Ticket..." : "Get Next Ticket"}
              {!actionLoading && <FaArrowRight className="btn-icon" />}
            </button>
          </div>
        ) : (
          <div className="current-ticket-container">
            <div className="current-ticket-header">
              <h3 className="current-ticket-title">Currently Handling:</h3>
              <span className="ticket-id">ID: {currentTicket._id}</span>
            </div>

            <div className="current-ticket-content">
              <div className="ticket-details">
                <h2 className="ticket-title">{currentTicket.title}</h2>
                <div className="ticket-meta">
                  <span className="ticket-created">
                    Created: {formatDate(currentTicket.createdAt)}
                  </span>
                </div>
                <div className="ticket-description">
                  <p>{currentTicket.description}</p>
                </div>

                {currentTicket.comments &&
                  currentTicket.comments.length > 0 && (
                    <div className="ticket-comments">
                      <h4>Comments:</h4>
                      <ul className="comments-list">
                        {currentTicket.comments.map((comment, index) => (
                          <li key={index} className="comment-item">
                            {comment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
              </div>

              <div className="ticket-actions">
                <button
                  onClick={handleSkipTicket}
                  className="skip-button"
                  disabled={actionLoading}
                >
                  <FaRedo className="btn-icon" />
                  Skip
                </button>
                <button
                  onClick={handleCompleteTicket}
                  className="handle-button"
                  disabled={actionLoading}
                >
                  <FaCheck className="btn-icon" />
                  Handle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketHandling;
