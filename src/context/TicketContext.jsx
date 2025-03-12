import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import ticketService from "../services/ticketService";

const TicketContext = createContext();

export const useTickets = () => useContext(TicketContext);

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentTicket, setCurrentTicket] = useState(null);

  const { token, user } = useAuth();

  useEffect(() => {
    if (token) {
      fetchTickets(currentFilter);
    }
  }, [token, currentFilter]);

  const fetchTickets = async (filter = "all") => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (filter) {
        case "not-done":
          response = await ticketService.getNotDoneTickets();
          break;
        case "blocked":
          response = await ticketService.getBlockedTickets();
          break;
        case "done":
          response = await ticketService.getDoneTickets();
          break;
        case "all":
        default:
          response = await ticketService.getAllTickets();
          break;
      }

      setTickets(response);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tickets.");
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData) => {
    setLoading(true);
    setError(null);
    try {
      const newTicket = await ticketService.createTicket(ticketData);
      setTickets((prev) => [...prev, newTicket]);
      return newTicket;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create ticket.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const lockTicket = async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTicket = await ticketService.lockTicket(ticketId);
      updateTicketInState(updatedTicket);
      setCurrentTicket(updatedTicket);
      return updatedTicket;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to lock ticket.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleTicket = async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTicket = await ticketService.handleTicket(ticketId);
      updateTicketInState(updatedTicket);
      setCurrentTicket(null);
      return updatedTicket;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to handle ticket.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const skipTicket = async (ticketId) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTicket = await ticketService.skipTicket(ticketId);
      updateTicketInState(updatedTicket);
      setCurrentTicket(null);
      return updatedTicket;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to skip ticket.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateTicketInState = (updatedTicket) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket._id === updatedTicket._id ? updatedTicket : ticket
      )
    );
  };

  const changeFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const getNextAvailableTicket = async () => {
    try {
      const availableTickets = await ticketService.getBlockedTickets();

      if (availableTickets.length > 0) {
        const nextTicket = availableTickets[0];
        return nextTicket;
      }
      return null;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to get next available ticket."
      );
      return null;
    }
  };

  const isTicketLockedByCurrentUser = (ticket) => {
    return ticket.status === "blocked" && ticket.userId === user?.id;
  };

  const value = {
    tickets,
    loading,
    error,
    currentFilter,
    currentTicket,
    fetchTickets,
    createTicket,
    lockTicket,
    handleTicket,
    skipTicket,
    changeFilter,
    getNextAvailableTicket,
    isTicketLockedByCurrentUser,
  };

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  );
};

export default TicketContext;
