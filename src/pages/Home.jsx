import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { IonSpinner } from "@ionic/react";
import { IonPage, IonContent } from "@ionic/react";

import "../components/ProductCard/ProductCard.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/product/getproducts?limit=10"
        );

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

  console.log("product", products[currentIndex]);

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
          <IonContent fullscreen className="ion-no-padding">
            {products.length > 0 && currentIndex < products.length ? (
              <ProductCard
                key={products[currentIndex]._id}
                product={products[currentIndex]}
                onVote={handleVote}
              />
            ) : (
              <p>No more products to display.</p>
            )}
          </IonContent>
        </IonPage>
      )}
    </>
  );
}

export default Home;
