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

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await present({ message: "Loading..." });

    try {
      const response = await axios.post("http://localhost:3001/user/signup", {
        email,
        password,
        username,
      });

      if (response.status === 200) {
        dismiss();
        alert({
          header: "Success",
          message: "You have successfully signed up",
          buttons: [{ text: "OK" }],
        });
        navigate("/signin");
      } else {
        dismiss();
        alert({
          header: "Error",
          message:
            response.data.message || "An error occurred. Please try again.",
          buttons: [{ text: "OK" }],
        });
      }
    } catch (error) {
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Sign Up</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="stacked">Username</IonLabel>
                <IonInput
                  type="text"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value)}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value)}
                  required
                />
              </IonItem>

              <IonButton
                className="ion-margin-top"
                expand="full"
                type="submit"
                color="secondary"
              >
                SIGN UP
              </IonButton>
            </form>
            <div className="ion-text-center ion-margin-top">
              <p>Have an account already?</p>
              <IonButton expand="block" fill="clear" routerLink="/signin">
                Sign In
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default Signup;
