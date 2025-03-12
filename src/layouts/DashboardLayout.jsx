import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import CreateTicketModal from "../components/tickets/CreateTicketModal";
import "../styles/pages/dashboard.css";

const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  const toggleCreateModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Navbar
        onCreateTicket={toggleCreateModal}
        onToggleSidebar={toggleMobileSidebar}
      />

      <div className="dashboard-container">
        <Sidebar isOpen={isMobileSidebarOpen} onClose={toggleMobileSidebar} />

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>

      {isCreateModalOpen && <CreateTicketModal onClose={toggleCreateModal} />}
    </div>
  );
};

export default DashboardLayout;
