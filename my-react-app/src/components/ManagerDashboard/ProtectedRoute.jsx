import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  if (!isAuthenticated) {
    alert("Please login first");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
