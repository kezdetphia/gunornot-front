import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthContextProvider } from "./context/authContext";
import "./index.css";
import Profile from "./pages/Profile";

const Main = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Signin />} />
          <Route path="/signUp" element={<Signup />} />
          <Route
            path="/app/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/app/products"
            element={
              // <ProtectedRoute>
              <ProductsPage />
              // </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <main>
                <p>There's nothing here!</p>
                <Navigate to="/" />
              </main>
            }
          />
        </Route>
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
