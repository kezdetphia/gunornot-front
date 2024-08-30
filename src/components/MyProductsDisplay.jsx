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
import React, { useEffect, useState } from "react";

function MyProductsDisplay({ initialProducts, setProductsUpdated }) {
  const [myProducts, setMyProducts] = useState(initialProducts);

  useEffect(() => {
    console.log("Initial Products:", initialProducts);
    setMyProducts(initialProducts);
    console.log("My Productsssss:", myProducts);
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

  return (
    <>
      <IonList>
        {myProducts?.map((product, index) => (
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
