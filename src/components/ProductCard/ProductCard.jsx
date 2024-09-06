import React, { useState } from "react";
import { IonImg, IonText } from "@ionic/react";
import StarRange from "../StarRange";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";
import StarIcon from "../StarIcon";

const ProductCard = React.memo(({ product }) => {
  const [starRating, setStarRating] = useState(0);
  const [allowUserToRate, setAllowUserToRate] = useState(true);

  const { updateVotes, rating } = useUpdateVotes(product?._id);

  const handleRangeChange = async (newValue) => {
    setStarRating(newValue);
    console.log("Selected Value:", newValue);
    await updateVotes(newValue);
    setAllowUserToRate(false);
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
        <div
          className={`rating-overlay ${allowUserToRate ? "visible" : "hidden"}`}
        >
          <StarRange starRating={starRating} onIonChange={handleRangeChange} />
        </div>
        <div
          className={`rating-overlay ${allowUserToRate ? "hidden" : "visible"}`}
        >
          <StarIcon rating={rating} />
          <IonText color="light">{rating.toFixed(1)}</IonText>
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
    </div>
  );
});

export default ProductCard;
