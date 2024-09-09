import { createContext, useContext, useEffect, useState } from "react";
import {
  createStorage,
  getToken,
  removeToken,
} from "../services/storageService";
import axios from "axios";

// Create an AuthContext
export const AuthContext = createContext();

// AuthContextProvider component to wrap the app and provide authentication context
export const AuthContextProvider = ({ children }) => {
  // State variables for user, authentication status, and loading state
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Effect hook to check and set user authentication status on component mount
  useEffect(() => {
    const setUserAuthenticated = async () => {
      setAuthLoading(true);
      try {
        // Initialize storage and get the auth token
        await createStorage();
        const token = await getToken("auth-token");

        if (token) {
          // If token exists, verify it with the backend
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_BACKEND_URL}/user/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 200) {
            // If verification successful, set user and authentication state
            setUser(res.data);
            setIsAuthenticated(true);
            console.log("User authenticated:", res.data);
          } else {
            setIsAuthenticated(false);
            console.log("Error setting user authenticated:", res.data);
          }
        } else {
          setIsAuthenticated(false);
          console.log("No token found");
        }
      } catch (error) {
        console.error("Error setting user authenticated:", error);
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    setUserAuthenticated();
  }, []);

  // Function to set user info and authentication status
  const setUserInfo = (userDetails) => {
    setUser(userDetails);
    setIsAuthenticated(true);
  };

  // Function to sign out the user
  const signOut = async () => {
    await removeToken("auth-token");
    setUser(null);
    setIsAuthenticated(false);
  };

  // Provide the authentication context to child components
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authLoading,
        setUserInfo,
        setIsAuthenticated,
        setUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside an AuthContextProvider");
  }
  return value;
};
