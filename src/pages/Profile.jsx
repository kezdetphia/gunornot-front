import React, { useEffect, useState } from "react";
import { IonCol, IonContent, IonGrid, IonRow, IonText } from "@ionic/react";
import { useAuth } from "../context/authContext";
import UserAvatar from "../components/UserAvatar";
import MyProductsDisplay from "../components/MyProductsDisplay";
import AddProduct from "../components/AddProduct/AddProduct";
import api from "../services/authApiRequest";

function Profile() {
  const { user, setUserInfo } = useAuth();

  const [myProducts, setMyProducts] = useState([]);
  const [productsUpdated, setProductsUpdated] = useState(false);

  // Effect hook to fetch user's products
  useEffect(() => {
    const fetchMyProducts = async () => {
      // Check if user has any products
      if (!user?.products || user.products.length === 0) {
        console.log("No products found for user");
        return;
      }

      try {
        // Fetch user's products from the server
        const response = await api.post("/product/getmyproducts", {
          productIds: user.products,
        });

        const products = await response.data;
        console.log("Fetched products:", products); // Debug log
        setMyProducts(products);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchMyProducts();
  }, [user, productsUpdated]); // Re-run effect when user or productsUpdated changes

  return (
    <IonContent className="ion-no-padding">
      <IonGrid>
        <IonRow className="ion-justify-content-center">
          <IonCol size="12" className="ion-text-center ion-no-padding">
            {/* Display user avatar */}
            <UserAvatar user={user} />
            <IonCol className="ion-no-padding">
              <IonText>
                <h3>Hello {user?.username}</h3>
              </IonText>
            </IonCol>
            {/* Display user's products */}
            <MyProductsDisplay
              initialProducts={myProducts}
              setProductsUpdated={setProductsUpdated}
            />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            {/* Component to add new products */}
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
