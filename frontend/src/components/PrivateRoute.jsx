import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  if (!isAuthenticated || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;