import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import {
  IonHeader,
  IonSpinner,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { IonPage, IonContent } from "@ionic/react";
import api from "../services/authApiRequest"; // Import the api utility

import "../components/ProductCard/ProductCard.css";
import { heart } from "ionicons/icons";
import ProfileCard from "../components/SwipeComponents/ProfileCard";
import "../components/SwipeComponents/Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await api.get("/product/getproducts?limit=10");

        console.log("fetch data");
        setProducts(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleVote = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
  }, [products.length]);

  return (
    <>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IonSpinner />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <IonPage>
          <IonContent fullscreen>
            <div className="cards-stack-container">
              {products.map((profile, index) => (
                <ProfileCard
                  {...profile}
                  key={profile._id}
                  // profile={profile}
                />
              ))}
              {/* <IonButton>
                <IonIcon icon={heart} />
              </IonButton> */}
            </div>
          </IonContent>
        </IonPage>
        // <IonPage>
        //   <IonContent fullscreen className="ion-no-padding">
        //     {products.length > 0 && currentIndex < products.length ? (
        //       <ProductCard
        //         key={products[currentIndex]._id}
        //         product={products[currentIndex]}
        //         onVote={handleVote}
        //       />
        //     ) : (
        //       <p>No more products to display.</p>
        //     )}
        //   </IonContent>
        // </IonPage>
      )}
    </>
  );
}

export default Home;
