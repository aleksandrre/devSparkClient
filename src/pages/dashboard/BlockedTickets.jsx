import React, { useEffect } from "react";
import TicketList from "../../components/tickets/TicketList";
import { useTickets } from "../../context/TicketContext";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/dashboard.css";

const BlockedTickets = () => {
  const { tickets, fetchTickets, changeFilter } = useTickets();
  const { user } = useAuth();

  useEffect(() => {
    changeFilter("blocked");
    fetchTickets("blocked");
  }, []);

  const userBlockedTickets = tickets;

  return (
    <div className="dashboard-page">
      <div className="page-header"></div>

      <TicketList
        tickets={userBlockedTickets}
        title="My Locked Tickets"
        emptyMessage="You don't have any locked tickets at the moment. Go to Unhandled Tickets to lock some tickets."
      />
    </div>
  );
};

export default BlockedTickets;
