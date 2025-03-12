import React, { useEffect } from "react";
import TicketList from "../../components/tickets/TicketList";
import { useTickets } from "../../context/TicketContext";
import { useAuth } from "../../context/AuthContext";
import "../../styles/pages/dashboard.css";

const DoneTickets = () => {
  const { tickets, fetchTickets, changeFilter } = useTickets();
  const { user } = useAuth();

  useEffect(() => {
    changeFilter("done");
    fetchTickets("done");
  }, []);

  const userDoneTickets = tickets;

  return (
    <div className="dashboard-page">
      <div className="page-header"></div>

      <TicketList
        tickets={userDoneTickets}
        title="My Handled Tickets"
        emptyMessage="You haven't handled any tickets yet. Lock tickets and mark them as handled to see them here."
      />
    </div>
  );
};

export default DoneTickets;
