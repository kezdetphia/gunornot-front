// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import App from "./App";
// import Signup from "./pages/Signup";
// import Signin from "./pages/Signin";
// import Dashboard from "./pages/Dashboard";
// import ProductsPage from "./pages/ProductsPage";
// import ProtectedRoute from "./routes/ProtectedRoute";
// import { AuthContextProvider } from "./context/authContext";
// import "./index.css";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import ProtectedRoutes from "./utils/protectedroutes";

// const Main = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/signin" element={<Signin />} />
//         <Route element={<ProtectedRoutes />}>
//           <Route path="/" element={<App />} />
//           <Route path="/app/dashboard" element={<Dashboard />} />
//           <Route path="/app/profile" element={<Profile />} />
//           <Route path="/app/products" element={<ProductsPage />} />
//         </Route> */}

//         <Route path="/" element={<App />}>
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <Navigate to="/app/products" />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/signin" element={<Signin />} />
//           <Route path="/app/notfound" element={<NotFound />} />
//           <Route
//             path="/app/dashboard"
//             element={
//               <ProtectedRoute>
//                 <Dashboard />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/app/profile"
//             element={
//               <ProtectedRoute>
//                 <Profile />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="/app/products"
//             element={
//               <ProtectedRoute>
//                 <ProductsPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="*"
//             element={
//               <main>
//                 <p>There's nothing here!</p>
//                 <Navigate to="/" />
//               </main>
//             }
//           />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <AuthContextProvider>
//     <Main />
//   </AuthContextProvider>
// );

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
import { AuthContextProvider, useAuth } from "./context/authContext";
import "./index.css";

const Main = () => {
  const { hasToken } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* Redirect to /app/products if a token is found, otherwise go to signin */}
          <Route
            index
            element={
              hasToken ? (
                <Navigate to="/app/products" />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route
            path="/signup"
            element={hasToken ? <Navigate to="/app/products" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={hasToken ? <Navigate to="/app/products" /> : <Signin />}
          />
          <Route
            path="/app/products"
            element={
              <ProtectedRoute>
                <ProductsPage />
              </ProtectedRoute>
            }
          />
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
          <Route path="*" element={<NotFound />} />
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
