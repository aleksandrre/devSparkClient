import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TicketProvider } from "./context/TicketContext";

import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AllTickets from "./pages/dashboard/AllTickets";
import NotDoneTickets from "./pages/dashboard/NotDoneTickets";
import BlockedTickets from "./pages/dashboard/BlockedTickets";
import DoneTickets from "./pages/dashboard/DoneTickets";
import TicketHandling from "./pages/dashboard/TicketHandling";
import NotFound from "./pages/NotFound";
import Root from "./pages/Root";

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Root />} />

          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Dashboard routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<AllTickets />} />
            <Route path="/not-done" element={<NotDoneTickets />} />
            <Route path="/blocked" element={<BlockedTickets />} />
            <Route path="/done" element={<DoneTickets />} />
            <Route path="/handle" element={<TicketHandling />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
