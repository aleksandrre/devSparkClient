import api from "./api";

const authService = {
  register: async (userData) => {
    return api.post("/auth/register", userData);
  },

  login: async (email, password) => {
    return api.post("/auth/login", { email, password });
  },
};

export default authService;
