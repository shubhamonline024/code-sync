import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>...</p>;

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
