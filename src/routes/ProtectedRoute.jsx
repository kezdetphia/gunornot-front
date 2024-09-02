import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { IonSpinner } from "@ionic/react";

const ProtectedRoute = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <IonSpinner />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
