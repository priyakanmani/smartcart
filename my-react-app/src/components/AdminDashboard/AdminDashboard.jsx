// AdminDashboardPage.jsx
import React from "react";
import Sidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboardPage = () => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="p-6 w-full bg-gray-100 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
