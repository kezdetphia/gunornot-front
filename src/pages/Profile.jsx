import { IonCol, IonContent, IonGrid, IonRow, IonText } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import UserAvatar from "../components/UserAvatar";
import axios from "axios";
import MyProductsDisplay from "../components/MyProductsDisplay";
import AddProduct from "../components/AddProduct";

function Profile() {
  const { user, setUserInfo } = useAuth();
  const [myProducts, setMyProducts] = useState([]);
  const [productsUpdated, setProductsUpdated] = useState(false);

  console.log("user", user);
  console.log("productsUpdateddddddd", productsUpdated);

  useEffect(() => {
    console.log("useEffect triggered with productsUpdated:", productsUpdated);

    const fetchMyProducts = async () => {
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

        const products = await response.data;
        console.log("Fetched products:", products); // Debug log
        setMyProducts(products);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchMyProducts();
  }, [user, productsUpdated]);

  return (
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" className="ion-text-center ion-no-padding">
            <UserAvatar user={user} />
            <IonCol className="ion-no-padding">
              <IonText>
                <h3>Hello {user?.username}</h3>
              </IonText>
            </IonCol>
            <MyProductsDisplay
              initialProducts={myProducts}
              setProductsUpdated={setProductsUpdated}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <AddProduct
              user={user}
              setUserInfo={setUserInfo} // Update user context with new product
              setProductsUpdated={setProductsUpdated}
            />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonContent>
  );
}

export default Profile;
