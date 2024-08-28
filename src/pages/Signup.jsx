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

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

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

  const [alert] = useIonAlert();
  const [present, dismiss] = useIonLoading();

  return (
    <IonCard>
      <IonCardContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">Username</IonLabel>
            <IonInput
              type="username"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value)}
            ></IonInput>
          </IonItem>
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
              SIGN UP
            </IonButton>
          </div>
        </form>
      </IonCardContent>
    </IonCard>
  );
}
export default Signup;
