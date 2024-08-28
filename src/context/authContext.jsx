// // import { createContext, useContext, useEffect, useState } from "react";
// // import { setToken, getToken, removeToken } from "../services/StorageService";
// // import axios from "axios";

// // export const AuthContext = createContext();

// // export const AuthContextProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [authLoading, setAuthLoading] = useState(true);

// //   useEffect(() => {
// //     const loadUserData = async () => {
// //       try {
// //         const token = await getToken("auth-token");
// //         if (token) {
// //           // Fetch user data from API using the token
// //           const response = await axios.get("http://localhost:3001/user/me", {
// //             headers: {
// //               Authorization: `Bearer ${token}`,
// //             },
// //           });
// //           setUser(response.data);
// //           console.log("User data loaded in autghconcetx:", response.data);
// //         }
// //       } catch (error) {
// //         console.error("Failed to load user data", error);
// //       } finally {
// //         setAuthLoading(false);
// //       }
// //     };

// //     loadUserData();
// //   }, []);

// //   const setUserInfo = (userDetails) => {
// //     setUser(userDetails);
// //   };

// //   const signOut = async () => {
// //     await removeToken("auth-token");
// //     setUser(null);
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         user,
// //         authLoading,
// //         setUserInfo,
// //         signOut,
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };

// // export const useAuth = () => {
// //   const value = useContext(AuthContext);

// //   if (!value) {
// //     throw new Error("useAuth must be wrapped inside an AuthContextProvider");
// //   }
// //   return value;
// // };

// import { createContext, useContext, useEffect, useState } from "react";
// import {
//   createStorage,
//   setToken,
//   getToken,
//   removeToken,
// } from "../services/StorageService";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [authLoading, setAuthLoading] = useState(true);

//   useEffect(() => {
//     const initializeStorageAndLoadUser = async () => {
//       await createStorage();
//       await loadUserData();
//     };

//     const loadUserData = async () => {
//       try {
//         const token = await getToken("auth-token");
//         if (token) {
//           // Fetch user data from API using the token
//           const response = await axios.get("http://localhost:3001/user/me", {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data);
//         }
//       } catch (error) {
//         console.error("Failed to load user data", error);
//       } finally {
//         setAuthLoading(false);
//       }
//     };

//     initializeStorageAndLoadUser();
//   }, []);

//   const setUserInfo = (userDetails) => {
//     setUser(userDetails);
//   };

//   const signOut = async () => {
//     await removeToken("auth-token");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         authLoading,
//         setUserInfo,
//         signOut,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const value = useContext(AuthContext);

//   if (!value) {
//     throw new Error("useAuth must be wrapped inside an AuthContextProvider");
//   }
//   return value;
// };

import { createContext, useContext, useEffect, useState } from "react";
import {
  createStorage,
  setToken,
  getToken,
  removeToken,
} from "../services/StorageService";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const initializeStorageAndLoadUser = async () => {
      await createStorage();
      await loadUserData();
    };

    const loadUserData = async () => {
      try {
        const token = await getToken("auth-token");
        if (token) {
          // Fetch user data from API using the token
          const response = await axios.get("http://localhost:3001/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to load user data", error);
      } finally {
        setAuthLoading(false);
      }
    };

    initializeStorageAndLoadUser();
  }, []);

  const setUserInfo = (userDetails) => {
    setUser(userDetails);
  };

  const signOut = async () => {
    await removeToken("auth-token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        setUserInfo,
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
