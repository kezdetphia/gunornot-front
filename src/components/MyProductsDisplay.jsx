// import {
//   IonImg,
//   IonItem,
//   IonItemOption,
//   IonItemOptions,
//   IonItemSliding,
//   IonLabel,
//   IonList,
//   IonText,
//   IonThumbnail,
// } from "@ionic/react";
// import React, { useEffect, useState } from "react";
// import api from "../services/authApiRequest"; // Import the api utility

// function MyProductsDisplay({ initialProducts, setProductsUpdated }) {
//   const [myProducts, setMyProducts] = useState(initialProducts);
//   const [productRating, setProductRating] = useState(0);

//   useEffect(() => {
//     const calculateAverageRating = () => {
//       const updatedRatings = myProducts.map(product => {
//         if (product.votes && product.votes.length > 0) {
//           const sum = product.votes.reduce((acc, vote) => acc + vote, 0);
//           return {
//             ...product,
//             averageRating: sum / product.votes.length
//           };
//         }
//         return {
//           ...product,
//           averageRating: 0
//         };
//       });

//       setMyProducts(updatedRatings);

//       // Update overall product rating (if needed)
//       const overallRating = updatedRatings.reduce((acc, product) => acc + product.averageRating, 0) / updatedRatings.length;
//       setProductRating(overallRating);
//     };

//     calculateAverageRating();
//   }, [myProducts]);

//   useEffect(() => {
//     setMyProducts(initialProducts);
//     console.log("My Products:", myProducts);
//   }, [initialProducts]);

//   const handleEditProduct = (productId) => {
//     console.log(`Edit product with ID: ${productId}`);
//     // Add your edit logic here
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       await api.post("/product/deleteproduct", {
//         id: productId,
//       });
//       console.log("Product deleted");

//       setMyProducts(myProducts.filter((product) => product._id !== productId));
//       setProductsUpdated((prevState) => !prevState);
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   // Sort products by rating in descending order
//   const sortedProducts = myProducts.slice().sort((a, b) => {
//     const ratingA = parseFloat(a?.rating?.$numberDecimal) || 0;
//     const ratingB = parseFloat(b?.rating?.$numberDecimal) || 0;
//     return ratingB - ratingA;
//   });

//   return (
//     <>
//       <IonList className="ion-padding-top ">
//         {sortedProducts?.map((product, index) => (
//           <IonItemSliding key={index}>
//             <IonItem>
//               <IonThumbnail slot="start">
//                 <IonImg src={product.img} />
//               </IonThumbnail>
//               <IonLabel>
//                 <IonText
//                   style={{ display: "flex", justifyContent: "space-between" }}
//                 >
//                   <span>{product?.name}</span>
//                   <span>
//                     {isNaN(parseFloat(product?.rating?.$numberDecimal))
//                       ? "No Rating"
//                       : parseFloat(product?.rating?.$numberDecimal).toFixed(2)}
//                   </span>
//                 </IonText>
//               </IonLabel>
//             </IonItem>

//             <IonItemOptions side="end">
//               <IonItemOption onClick={() => handleEditProduct(product?._id)}>
//                 Edit
//               </IonItemOption>
//               <IonItemOption
//                 color="danger"
//                 onClick={() => handleDeleteProduct(product?._id)}
//               >
//                 Delete
//               </IonItemOption>
//             </IonItemOptions>
//           </IonItemSliding>
//         ))}
//       </IonList>
//     </>
//   );
// }

// export default MyProductsDisplay;

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
import React, { useEffect, useState } from "react";
import api from "../services/authApiRequest"; // Import the api utility

function MyProductsDisplay({ initialProducts, setProductsUpdated }) {
  const [myProducts, setMyProducts] = useState(initialProducts);

  // Update local state when initialProducts prop changes
  useEffect(() => {
    setMyProducts(initialProducts);
    console.log("My Products:", initialProducts);
  }, [initialProducts]);

  // Helper function to calculate average rating for a product
  const calculateAverageRating = (product) => {
    if (product.votes && product.votes.length > 0) {
      const sum = product.votes.reduce((acc, vote) => acc + vote, 0);
      return sum / product.votes.length;
    }
    return 0;
  };

  const handleEditProduct = (productId) => {
    console.log(`Edit product with ID: ${productId}`);
    // Add your edit logic here
  };

  // Function to delete a product
  const handleDeleteProduct = async (productId) => {
    try {
      // Send delete request to the server
      await api.post("/product/deleteproduct", {
        id: productId,
      });
      console.log("Product deleted");

      // Update local state by filtering out the deleted product
      setMyProducts(myProducts.filter((product) => product._id !== productId));
      // Trigger update in parent component
      setProductsUpdated((prevState) => !prevState);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Sort products by rating in descending order
  const sortedProducts = myProducts.slice().sort((a, b) => {
    const ratingA = calculateAverageRating(a);
    const ratingB = calculateAverageRating(b);
    return ratingB - ratingA;
  });

  return (
    <>
      <IonList className="ion-padding-top ">
        {sortedProducts?.map((product, index) => (
          <IonItemSliding key={index}>
            <IonItem>
              <IonThumbnail slot="start">
                <IonImg src={product.img} />
              </IonThumbnail>
              <IonLabel>
                <IonText
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>{product?.name}</span>
                  <span>
                    {/* Display 'No Rating' if the calculation results in NaN, otherwise show the calculated rating */}
                    {isNaN(calculateAverageRating(product))
                      ? "No Rating"
                      : calculateAverageRating(product).toFixed(2)}
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
