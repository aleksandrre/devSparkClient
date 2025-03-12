import api from "./api";

const ticketService = {
  createTicket: async (ticketData) => {
    return api.post("/tickets/create", ticketData);
  },

  getAllTickets: async () => {
    return api.get("/tickets");
  },

  getNotDoneTickets: async () => {
    return api.get("/tickets/not-done");
  },

  getBlockedTickets: async () => {
    return api.get("/tickets/blocked");
  },

  getDoneTickets: async () => {
    return api.get("/tickets/done");
  },

  lockTicket: async (ticketId) => {
    return api.put(`/tickets/lock/${ticketId}`);
  },

  handleTicket: async (ticketId) => {
    return api.put(`/tickets/handle/${ticketId}`);
  },

  skipTicket: async (ticketId) => {
    return api.put(`/tickets/skip/${ticketId}`);
  },
};

export default ticketService;
