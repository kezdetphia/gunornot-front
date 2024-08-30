import {
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonText,
  IonThumbnail,
} from "@ionic/react";
import axios from "axios";
import React from "react";

function MyProductsDisplay({ myProducts }) {
  const handleArchive = (productId) => {
    console.log(`Archive product with ID: ${productId}`);
    // Add your archive logic here
  };

  const handleFavorite = (productId) => {
    console.log(`Favorite product with ID: ${productId}`);
    // Add your favorite logic here
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.post("http://localhost:3001/product/deleteproduct", {
        id: productId,
      });
      console.log("Product deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    window.location.reload();
  };

  return (
    <>
      <IonList>
        {myProducts.map((product, index) => (
          <IonItemSliding key={index}>
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src={product.img} />
              </IonThumbnail>
              <IonLabel>
                <IonText>{product?.name}</IonText>
                <IonText>{product?.description}</IonText>
                <IonText>
                  {isNaN(parseFloat(product?.rating?.$numberDecimal))
                    ? "No Rating"
                    : parseFloat(product?.rating?.$numberDecimal).toFixed(2)}
                </IonText>
              </IonLabel>
            </IonItem>

            <IonItemOptions side="end">
              <IonItemOption onClick={() => handleFavorite(product?._id)}>
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
