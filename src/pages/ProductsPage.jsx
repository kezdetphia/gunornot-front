import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
  IonCardSubtitle,
} from "@ionic/react";

function ProductsPage() {
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

  const handleVote = () => {
    // Move to the next product
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  console.log("product", products[currentIndex]);
  return (
    <IonPage>
      <IonContent fullscreen className="ion-no-padding">
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              width: "100px",
            }}
          >
            <IonSpinner />
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {products.length > 0 && currentIndex < products.length ? (
              <IonCard key={products[currentIndex]._id}>
                <IonCardHeader>
                  <IonCardTitle> {products[currentIndex].name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <ProductCard
                    product={products[currentIndex]}
                    onVote={handleVote}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "10px",
                    }}
                  >
                    <IonCardSubtitle>
                      {products[currentIndex].description}
                    </IonCardSubtitle>
                  </div>
                </IonCardContent>
              </IonCard>
            ) : (
              <p>No more products to display.</p>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ProductsPage;
