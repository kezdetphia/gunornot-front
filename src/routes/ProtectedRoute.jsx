// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { getToken } from "../services/StorageService";

// const ProtectedRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const token = await getToken("auth-token");
//         setIsAuthenticated(!!token); // Convert token to a boolean
//       } catch (error) {
//         console.error("Failed to get token:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/app/products" />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../services/StorageService";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken("auth-token");
        setIsAuthenticated(!!token); // Convert token to a boolean
      } catch (error) {
        console.error("Failed to get token:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
