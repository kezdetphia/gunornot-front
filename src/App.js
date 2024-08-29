import { Outlet } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
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
  setupIonicReact,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "./services/StorageService";

// Theme variables
import "./theme/variables.css";
import { useAuth } from "./context/authContext";

setupIonicReact();

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
