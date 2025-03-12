import React, { useEffect } from "react";
import TicketList from "../../components/tickets/TicketList";
import { useTickets } from "../../context/TicketContext";
import "../../styles/pages/dashboard.css";

const AllTickets = () => {
  const { tickets, fetchTickets, changeFilter } = useTickets();

  useEffect(() => {
    changeFilter("all");
    fetchTickets("all");
  }, []);

  return (
    <div className="dashboard-page">
      <div className="page-header"></div>

      <TicketList
        tickets={tickets}
        title="All Tickets"
        emptyMessage="There are no tickets in the system. Create a new ticket to get started!"
      />
    </div>
  );
};

export default AllTickets;
