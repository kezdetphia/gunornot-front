import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { IonSpinner, IonPage, IonContent } from "@ionic/react";
import api from "../services/authApiRequest"; // Import the api utility for making authenticated requests

import "../components/ProductCard/ProductCard.css";

// TODO: if userId from useAuth is the same as the product.userId, then the product should not be displayed
function Home() {
  // State variables
  const [products, setProducts] = useState([]); // Stores the list of products
  const [loading, setLoading] = useState(true); // Indicates whether data is being fetched
  const [error, setError] = useState(null); // Stores any error messages
  const [currentIndex, setCurrentIndex] = useState(0); // Tracks the index of the current product being displayed

  // Fetch products when the component mounts
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        // Fetch 10 products from the API
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

  // Handle swipe gestures on product cards
  const handleSwipe = useCallback(
    (direction) => {
      setCurrentIndex((prevIndex) => {
        if (direction === "left") {
          // Move to the next product (circular)
          return (prevIndex + 1) % products.length;
        } else if (direction === "right") {
          // Move to the previous product (circular)
          return (prevIndex - 1 + products.length) % products.length;
        }
        return prevIndex;
      });
    },
    [products.length]
  );

  return (
    <>
      {loading ? (
        // Display a loading spinner while fetching data
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
        // Display error message if fetching fails
        <p>{error}</p>
      ) : (
        // Display product cards when data is loaded
        <IonPage>
          <IonContent fullscreen className="ion-no-padding">
            <div className="card-stack">
              {products.length > 0 && currentIndex < products.length ? (
                <>
                  {/* Display up to two product cards at a time */}
                  {products
                    .slice(currentIndex, currentIndex + 2)
                    .map((product, index) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        onSwipe={handleSwipe}
                        style={{ zIndex: products.length - index }}
                      />
                    ))}
                </>
              ) : (
                // Display message when no more products are available
                <p>No more products to display.</p>
              )}
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  );
}

export default Home;
