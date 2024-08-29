import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoutes = () => {
  const { hasToken } = useAuth();
  console.log("hasToken", hasToken);

  return hasToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
