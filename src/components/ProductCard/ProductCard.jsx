import React, { useState } from "react";
import { IonImg, IonText } from "@ionic/react";
import StarRange from "../StarRange";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";

const ProductCard = React.memo(({ product }) => {
  const [starRating, setStarRating] = useState(0);

  const { updateVotes, rating } = useUpdateVotes(product?._id);

  const handleRangeChange = async (newValue) => {
    setStarRating(newValue);
    console.log("Selected Value:", newValue);
    await updateVotes(newValue);
  };

  return (
    <div className="card-container">
      {/* Main Image */}
      <div className="main-image-container">
        <IonImg
          src={product.img[0]}
          alt={product.name}
          className="main-image"
        />
        <div className="rating-overlay">
          <StarRange starRating={starRating} onIonChange={handleRangeChange} />
        </div>
      </div>

      {/* Description */}
      {/* <IonText className="description">{product.description}</IonText> */}

      {/* Additional Images */}
      <div className="additional-images">
        {product.img.slice(1).map((imgUrl, index) => (
          <IonImg
            key={index}
            src={imgUrl}
            alt={`${product.name}-${index}`}
            className="additional-image"
          />
        ))}
      </div>

      <p>Average Rating: {rating.toFixed(1)}</p>
      <p>Selected Value: {starRating.toFixed(1)}</p>
    </div>
  );
});

export default ProductCard;
