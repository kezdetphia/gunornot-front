import {
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonRow,
  IonText,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";

import { useAuth } from "../context/authContext";
import UserAvatar from "../components/UserAvatar";
import axios from "axios";
import MyProductsDisplay from "../components/MyProductsDisplay";
import AddProduct from "../components/AddProduct";
import MyGunModal from "../components/MyGunModal";

function Profile() {
  const { user } = useAuth();
  console.log("rpfile user", user);
  const [myProducts, setMyProducts] = useState([]);

  useEffect(() => {
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

        const products = response.data;
        console.log("Fetched products:", products); // Debug log
        setMyProducts(products);
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchMyProducts();
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
            <MyProductsDisplay myProducts={myProducts} />

            {/* <ProfileProductCards myProducts={myProducts} /> */}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <AddProduct user={user} />
          </IonCol>
        </IonRow>
      </IonGrid>
      <MyGunModal />
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

// import React, { useEffect, useState } from "react";
// import {
//   IonContent,
//   IonGrid,
//   IonRow,
//   IonCol,
//   IonList,
//   IonListHeader,
//   IonLabel,
//   IonItem,
//   IonInput,
//   IonTextarea,
//   IonButton,
//   IonThumbnail,
//   IonImg,
//   IonText,
// } from "@ionic/react";
// import axios from "axios";
// import AddProduct from "../components/AddProduct";
// import MyProductsDisplay from "../components/MyProductsDisplay";
// import { useAuth } from "../context/authContext";

// function Profile() {
//   const { user } = useAuth();
//   const [myProducts, setMyProducts] = useState([]);

//   useEffect(() => {
//     const fetchMyProducts = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3001/product/getmyproducts",
//           { userId: user?._id }
//         );
//         setMyProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchMyProducts();
//   }, [user]);

//   return (
//     <IonContent className="ion-padding">
//       <IonGrid>
//         <IonRow>
//           <IonCol>
//             <MyProductsDisplay
//               myProducts={myProducts}
//               setMyProducts={setMyProducts}
//             />
//           </IonCol>
//         </IonRow>
//         <IonRow>
//           <IonCol>
//             <AddProduct user={user} setMyProducts={setMyProducts} />
//           </IonCol>
//         </IonRow>
//       </IonGrid>
//     </IonContent>
//   );
// }

// export default Profile;
