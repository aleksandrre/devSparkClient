import React from "react";
import TicketCard from "./TicketCard";
import { useTickets } from "../../context/TicketContext";
import { FaTicketAlt, FaExclamationTriangle } from "react-icons/fa";
import "../../styles/components/ticket.css";

const TicketList = ({ tickets, title, emptyMessage }) => {
  const { lockTicket, handleTicket, skipTicket, loading, error } = useTickets();

  const onLockTicket = async (ticketId) => {
    await lockTicket(ticketId);
  };

  const onHandleTicket = async (ticketId) => {
    await handleTicket(ticketId);
  };

  const onSkipTicket = async (ticketId) => {
    await skipTicket(ticketId);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading tickets...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <h3>Error loading tickets</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!tickets || tickets.length === 0) {
    return (
      <div className="empty-container">
        <FaTicketAlt className="empty-icon" />
        <h3>No tickets found</h3>
        <p>
          {emptyMessage || "There are no tickets to display at the moment."}
        </p>
      </div>
    );
  }

  return (
    <div className="ticket-list-container">
      <h2 className="ticket-list-title">{title}</h2>
      <div className="ticket-list">
        {tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            onLock={onLockTicket}
            onHandle={onHandleTicket}
            onSkip={onSkipTicket}
          />
        ))}
      </div>
    </div>
  );
};

export default TicketList;
