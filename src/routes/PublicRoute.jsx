import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { IonSpinner } from "@ionic/react";

const PublicRoute = () => {
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

  return isAuthenticated ? <Navigate to="/app/products" /> : <Outlet />;
};

export default PublicRoute;
