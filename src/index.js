import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import Layout from "./components/Layout";
import { AuthContextProvider, useAuth } from "./context/authContext";
import "./index.css";

const Main = () => {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/app/products" : "/signin"} />
          }
        />
        <Route element={<PublicRoute />}>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/app/*" element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="products" element={<ProductsPage />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <Main />
  </AuthContextProvider>
);
