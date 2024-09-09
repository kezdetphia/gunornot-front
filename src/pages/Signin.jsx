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

//TODO: On ios simulator the password filed doesn't update the value when the user types
//or the password field loses focus. Therefore the password first time isn't accepted,
//even if the credentials are correct, but the second time is accepted when the password is updated,
//by clicking away from the form.
//This must be an ionic thing, since regular react form onchage updates the state on every keystroke.
//I already tried to use useRef, with blur to lose focuse before submitting but it didn't work.
//I also tried setTimeOut with a short delay but didnt work.

//If you dont know an ionic solution I can just create a regular react form with onchage on every keystroke.

const Signin = () => {
  const navigate = useNavigate();
  const { setUserInfo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hooks for displaying alerts and loading indicators
  const [alert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  console.log("login password", password);

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
