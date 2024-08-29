import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { IonSpinner } from "@ionic/react";
function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

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
    // <IonContent fullscreen={true} className="ion-padding">
    <div>
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
            <div key={products[currentIndex]._id}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1>Encounters</h1>
                {/* <div>
                  <IonButton onClick={() => navigate("/app/profile")}>
                    <IonIcon icon={menu} />
                  </IonButton>
                </div> */}
              </div>
              <ProductCard
                product={products[currentIndex]}
                onVote={handleVote}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              ></div>
            </div>
          ) : (
            <p>No more products to display.</p>
          )}
        </div>
      )}
    </div>
    // </IonContent>
  );
}

export default ProductsPage;
