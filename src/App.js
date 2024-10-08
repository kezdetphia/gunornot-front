import React from "react";
import { Outlet } from "react-router-dom";
// Theme variables
import "./theme/variables.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

function App() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    // navigate("/signin");
  };

  return (
    <>
      <IonMenu side="end" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu Content</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton onClick={handleSignOut}>Sign Out</IonButton>
        </IonContent>
        <IonContent className="ion-padding">
          <IonButton onClick={() => navigate("/app/profile")}>
            Profile
          </IonButton>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle onClick={() => navigate("/")}>Gun or Not</IonTitle>
            <IonButtons slot="end">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-no-padding">
          <Outlet />
        </IonContent>
      </IonPage>
    </>
  );
}

export default App;
