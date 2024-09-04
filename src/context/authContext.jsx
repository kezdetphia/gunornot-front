import { createContext, useContext, useEffect, useState } from "react";
import {
  createStorage,
  getToken,
  removeToken,
} from "../services/storageService";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const setUserAuthenticated = async () => {
      setAuthLoading(true);
      try {
        await createStorage();
        const token = await getToken("auth-token");

        if (token) {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_BACKEND_URL}/user/me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 200) {
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

  const setUserInfo = (userDetails) => {
    setUser(userDetails);
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    await removeToken("auth-token");
    setUser(null);
    setIsAuthenticated(false);
  };

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

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useAuth must be wrapped inside an AuthContextProvider");
  }
  return value;
};
