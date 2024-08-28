// // import React, { useState } from "react";
// // import {
// //   IonCard,
// //   IonCardContent,
// //   IonInput,
// //   IonItem,
// //   IonLabel,
// //   IonButton,
// //   useIonAlert,
// //   useIonLoading,
// // } from "@ionic/react";
// // import { useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { setToken } from "../services/StorageService";
// // import { Storage } from "@ionic/storage";

// // function Signin() {
// //   const navigate = useNavigate();
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   // Initialize Ionic Storage
// //   const storage = new Storage();
// //   storage.create();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     await present({ message: "Loading..." });

// //     try {
// //       const response = await axios.post("http://localhost:3001/user/signin", {
// //         email,
// //         password,
// //       });

// //       if (response.status === 200) {
// //         console.log(response.data);
// //         // Save the token
// //         await setToken(storage, response.data.token);
// //         dismiss();
// //         alert({
// //           header: "Success",
// //           message: "You have successfully signed in",
// //           buttons: [{ text: "OK" }],
// //         });
// //         navigate("/app/products");
// //       } else {
// //         dismiss();
// //         alert({
// //           header: "Error",
// //           message:
// //             response.data.message || "An error occurred. Please try again.",
// //           buttons: [{ text: "OK" }],
// //         });
// //       }
// //     } catch (error) {
// //       dismiss();
// //       alert({
// //         header: "Error",
// //         message:
// //           error.response?.data?.message ||
// //           "Invalid credentials. Please try again.",
// //         buttons: [{ text: "OK" }],
// //       });
// //     }
// //   };

// //   const [alert] = useIonAlert();
// //   const [present, dismiss] = useIonLoading();

// //   return (
// //     <IonCard>
// //       <IonCardContent>
// //         <form onSubmit={handleSubmit}>
// //           <IonItem>
// //             <IonLabel position="stacked">Email</IonLabel>
// //             <IonInput
// //               type="email"
// //               value={email}
// //               onIonChange={(e) => setEmail(e.detail.value)}
// //             ></IonInput>
// //           </IonItem>

// //           <IonItem>
// //             <IonLabel position="stacked">Password</IonLabel>
// //             <IonInput
// //               type="password"
// //               value={password}
// //               onIonChange={(e) => setPassword(e.detail.value)}
// //             ></IonInput>
// //           </IonItem>

// //           <div className="ion-margin-top">
// //             <IonButton expand="full" type="submit" color="secondary">
// //               Sign In
// //             </IonButton>
// //           </div>
// //         </form>
// //       </IonCardContent>
// //     </IonCard>
// //   );
// // }
// // export default Signin;
// import React, { useState } from "react";
// import {
//   IonCard,
//   IonCardContent,
//   IonInput,
//   IonItem,
//   IonLabel,
//   IonButton,
//   useIonAlert,
//   useIonLoading,
// } from "@ionic/react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { getToken, setToken } from "../services/StorageService";
// import { useAuth } from "../context/authContext";

// function Signin() {
//   const navigate = useNavigate();
//   const { setUserInfo } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [alert] = useIonAlert();
//   const [present, dismiss] = useIonLoading();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await present({ message: "Loading..." });

//     try {
//       const response = await axios.post("http://localhost:3001/user/signin", {
//         email,
//         password,
//       });

//       if (response.status === 200) {
//         console.log(response.data);
//         // Save the token
//         await setToken("auth-token", response.data.token);
//         // const storedToken = await getToken("auth-token");
//         // console.log("Stored Token:", storedToken);

//         // Update user data
//         setUserInfo(response.data.user);

//         dismiss();
//         alert({
//           header: "Success",
//           message: "You have successfully signed in",
//           buttons: [{ text: "OK" }],
//         });
//         navigate("/app/products");
//       } else {
//         dismiss();
//         alert({
//           header: "Error",
//           message:
//             response.data.message || "An error occurred. Please try again.",
//           buttons: [{ text: "OK" }],
//         });
//       }
//     } catch (error) {
//       dismiss();
//       alert({
//         header: "Error",
//         message:
//           error.response?.data?.message ||
//           "Invalid credentials. Please try again.",
//         buttons: [{ text: "OK" }],
//       });
//     }
//   };

//   return (
//     <IonCard>
//       <IonCardContent>
//         <form onSubmit={handleSubmit}>
//           <IonItem>
//             <IonLabel position="stacked">Email</IonLabel>
//             <IonInput
//               type="email"
//               value={email}
//               onIonChange={(e) => setEmail(e.detail.value)}
//             ></IonInput>
//           </IonItem>

//           <IonItem>
//             <IonLabel position="stacked">Password</IonLabel>
//             <IonInput
//               type="password"
//               value={password}
//               onIonChange={(e) => setPassword(e.detail.value)}
//             ></IonInput>
//           </IonItem>

//           <div className="ion-margin-top">
//             <IonButton expand="full" type="submit" color="secondary">
//               Sign In
//             </IonButton>
//           </div>
//         </form>
//       </IonCardContent>
//     </IonCard>
//   );
// }

// export default Signin;
import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  useIonAlert,
  useIonLoading,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, getToken } from "../services/StorageService";
import { useAuth } from "../context/authContext";

function Signin() {
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await present({ message: "Loading..." });

    try {
      const response = await axios.post("http://localhost:3001/user/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        console.log("Response Data:", response.data);
        await setToken("auth-token", response.data.token);

        const storedToken = await getToken("auth-token");
        console.log("Stored Token after setToken:", storedToken);

        if (storedToken === response.data.token) {
          setUserInfo(response.data.userData);
          console.log("User Info after signin:", response.data.userData);
          dismiss();
          alert({
            header: "Success",
            message: "You have successfully signed in",
            buttons: [{ text: "OK" }],
          });
          navigate("/app/products");
        } else {
          throw new Error("Token was not stored correctly");
        }
      } else {
        throw new Error(
          response.data.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      console.error("Sign-in Error:", error);
      dismiss();
      alert({
        header: "Error",
        message:
          error.response?.data?.message ||
          "Invalid credentials. Please try again.",
        buttons: [{ text: "OK" }],
      });
    }
  };

  return (
    <IonCard>
      <IonCardContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value)}
            ></IonInput>
          </IonItem>

          <div className="ion-margin-top">
            <IonButton expand="full" type="submit" color="secondary">
              Sign In
            </IonButton>
          </div>
        </form>
      </IonCardContent>
    </IonCard>
  );
}

export default Signin;
