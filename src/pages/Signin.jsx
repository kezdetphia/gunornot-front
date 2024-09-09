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
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, getToken } from "../services/storageService";
import { useAuth } from "../context/authContext";

const Signin = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hooks for displaying alerts and loading indicators
  const [alert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await present({ message: "Loading..." });

    try {
      // Send sign-in request to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_BACKEND_URL}/user/signin`,
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Store the authentication token
        await setToken("auth-token", response.data.token);
        const storedToken = await getToken("auth-token");

        if (storedToken === response.data.token) {
          // Update user info in the global state
          setUserInfo(response.data.userData);
          dismiss();
          // Show success alert
          alert({
            header: "Success",
            message: "You have successfully signed in",
            buttons: [{ text: "OK" }],
          });
          // Navigate to home page
          navigate("/app/home");
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
      // Show error alert
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign In</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              {/* Email input field */}
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value)}
                  required
                />
              </IonItem>

              {/* Password input field */}
              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value)}
                  required
                />
              </IonItem>

              {/* Submit button */}
              <IonButton
                className="ion-margin-top"
                expand="full"
                type="submit"
                color="secondary"
              >
                Sign In
              </IonButton>
            </form>
            {/* Link to registration page */}
            <div className="ion-text-center ion-margin-top">
              <p>Don't have an account yet?</p>
              <IonButton expand="block" fill="clear" routerLink="/signup">
                Register
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Signin;
