import React, { useEffect } from "react";
import TicketList from "../../components/tickets/TicketList";
import { useTickets } from "../../context/TicketContext";
import "../../styles/pages/dashboard.css";

const NotDoneTickets = () => {
  const { tickets, fetchTickets, changeFilter } = useTickets();

  useEffect(() => {
    changeFilter("not-done");
    fetchTickets("not-done");
  }, []);

  const notDoneTickets = tickets.filter(
    (ticket) => ticket.status === "open" || ticket.status === "blocked"
  );

  return (
    <div className="dashboard-page">
      <div className="page-header"></div>

      <TicketList
        tickets={notDoneTickets}
        title="Unhandled Tickets"
        emptyMessage="There are no unhandled tickets at the moment."
      />
    </div>
  );
};

export default NotDoneTickets;
