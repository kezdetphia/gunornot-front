import { IonButton, IonIcon } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import FirebaseImageUpload from "../firebase/firebaseImageUpload";
import { IonNav } from "@ionic/react";
import ProductsPage from "./ProductsPage";
import { removeToken } from "../services/StorageService";

function Profile() {
  const navigate = useNavigate();
  return (
    <div>
      {/* <IonNav root={() => <ProductsPage />}></IonNav> */}
      <IonButton onClick={() => navigate("/app/products")}>
        <IonIcon slot="icon-only" icon={arrowBack} />
      </IonButton>
      <FirebaseImageUpload />
      <IonButton
        onClick={async () => {
          await removeToken();
          navigate("/signin");
        }}
      >
        Sign Out
      </IonButton>
    </div>
  );
}

export default Profile;
