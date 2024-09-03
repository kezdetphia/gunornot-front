import {
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonListHeader,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function MyProductsDisplay({ initialProducts, setProductsUpdated }) {
  const [myProducts, setMyProducts] = useState(initialProducts);

  useEffect(() => {
    console.log("Initial Products:", initialProducts);
    setMyProducts(initialProducts);
    console.log("My Products:", myProducts);
  }, [initialProducts]);

  const handleEditProduct = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    // Add your edit logic here
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post("http://localhost:3001/product/deleteproduct", {
        id: productId,
      });
      console.log("Product deleted");

      setMyProducts(myProducts.filter((product) => product._id !== productId));
      setProductsUpdated((prevState) => !prevState);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Sort products by rating in descending order
  const sortedProducts = myProducts.slice().sort((a, b) => {
    const ratingA = parseFloat(a?.rating?.$numberDecimal) || 0;
    const ratingB = parseFloat(b?.rating?.$numberDecimal) || 0;
    return ratingB - ratingA;
  });

  return (
    <>
      <IonList className="ion-padding-top ">
        {sortedProducts?.map((product, index) => (
          <IonItemSliding key={index}>
            <IonItem
              style={{
                backgroundColor: index === 0 ? "#FFD700" : "transparent", // Change background color for top-rated product
              }}
            >
              <IonThumbnail slot="start">
                <IonImg src={product.img} />
              </IonThumbnail>
              <IonLabel>
                <IonText
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{product?.name}</span>
                  <span>
                    {isNaN(parseFloat(product?.rating?.$numberDecimal))
                      ? "No Rating"
                      : parseFloat(product?.rating?.$numberDecimal).toFixed(2)}
                  </span>
                </IonText>
              </IonLabel>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption onClick={() => handleEditProduct(product?._id)}>
                Edit
              </IonItemOption>
              <IonItemOption
                color="danger"
                onClick={() => handleDeleteProduct(product?._id)}
              >
                Delete
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        ))}
      </IonList>
    </>
  );
}

export default MyProductsDisplay;
