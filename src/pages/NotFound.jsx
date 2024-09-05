import React from "react";
import { useNavigate } from "react-router-dom";
import { IonPage, IonContent, IonButton, IonText } from "@ionic/react";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/app/home");
  };

  return (
    <IonPage>
      <IonContent
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "400px", margin: "0 auto" }}>
          <IonText color="danger">
            <h1 style={{ fontSize: "6rem", marginBottom: "0.5rem" }}>404</h1>
            <h2 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
              Page Not Found
            </h2>
          </IonText>
          <IonButton onClick={handleGoHome} color="primary">
            Go to Home
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
