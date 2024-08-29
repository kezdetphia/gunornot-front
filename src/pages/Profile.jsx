import { IonCol, IonContent, IonGrid, IonRow, IonText } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { IonNav } from "@ionic/react";
import ProductsPage from "./ProductsPage";
import FirebaseImageUpload from "../components/FirebaseImageUpload";
import { useAuth } from "../context/authContext";
import ProfileProductCards from "../components/ProfileProductCards/ProfileProductCards";
import UserAvatar from "../components/UserAvatar";
import axios from "axios";

function Profile() {
  const { user } = useAuth();
  console.log("rpfile user", user);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
    const getMyProducts = async () => {
      if (!user?.products || user.products.length === 0) {
        console.log("No products found for user");
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:3001/product/getmyproducts",
          {
            productIds: user.products,
          }
        );

        const products = response.data;
        console.log("Fetched products:", products); // Debug log
        setMyProducts(products);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    getMyProducts();
  }, [user]);

  return (
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow className="ion-justify-content-center ">
          <IonCol size="12" className="ion-text-center ion-no-padding">
            <UserAvatar user={user} />
            <IonCol className="ion-no-padding">
              <IonText>
                <h3>{user?.username}</h3>
              </IonText>
            </IonCol>

            <ProfileProductCards myProducts={myProducts} />
            {/* <p
              style={{ textAlign: "center", maxWidth: "80%", margin: "0 auto" }}
            >
              Here's a small text description for the content. Nothing more,
              nothing less.
            </p> */}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <FirebaseImageUpload user={user} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>

    // <div>
    //   {/* <IonNav root={() => <ProductsPage />}></IonNav> */}
    //   <IonButton onClick={() => navigate("/app/products")}>
    //     <IonIcon slot="icon-only" icon={arrowBack} />
    //   </IonButton>
    //   <FirebaseImageUpload />
    //   <IonButton
    //     onClick={async () => {
    //       await removeToken();
    //       navigate("/signin");
    //     }}
    //   >
    //     Sign Out
    //   </IonButton>
    // </div>
  );
}

export default Profile;
