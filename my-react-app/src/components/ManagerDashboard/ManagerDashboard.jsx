// src/components/ManagerDashboard/ManagerDashboardPage.jsx
import { ShoppingCart, LogOut } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";

const ManagerDashboardPage = ({ userName }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Clear authentication
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");

    // 🔹 Redirect to home ("/")
    navigate("/");

    // Optionally: show a toast or alert
    // toast.success("Logged out successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 rounded-lg w-10 h-10 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                Smart Shopping System
              </h1>
              <p className="text-sm text-gray-600">Store Manager</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">Welcome!</p>
              <p className="text-sm text-gray-600">{userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar - pass handleLogout */}
        <ManagerSidebar onLogout={handleLogout} />

        {/* Dynamic Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboardPage;
