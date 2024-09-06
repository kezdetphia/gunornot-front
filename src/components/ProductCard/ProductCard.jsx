import React, { useState, useEffect, useRef } from "react";
import { IonImg, IonText, createGesture } from "@ionic/react";
import StarRange from "../StarRange";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";
import StarIcon from "../StarIcon";

const ProductCard = React.memo(({ product, onSwipe }) => {
  const [starRating, setStarRating] = useState(0);
  const [allowUserToRate, setAllowUserToRate] = useState(true);
  const cardRef = useRef(null);

  const { updateVotes, rating } = useUpdateVotes(product?._id);

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      const gesture = createGesture({
        el: card,
        gestureName: "card-swipe",
        onMove: (detail) => {
          card.style.transform = `translateX(${detail.deltaX}px) rotate(${
            detail.deltaX / 20
          }deg)`;
        },
        onEnd: (detail) => {
          const windowWidth = window.innerWidth;
          card.style.transition =
            "0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          if (detail.deltaX > windowWidth / 2) {
            card.style.transform = `translateX(${windowWidth * 1.5}px)`;
            setTimeout(() => {
              onSwipe("left");
              card.style.transform = ``;
            }, 250);
          } else if (detail.deltaX < -windowWidth / 2) {
            card.style.transform = `translateX(-${windowWidth * 1.5}px)`;
            setTimeout(() => {
              onSwipe("right");
              card.style.transform = ``;
            }, 250);
          } else {
            card.style.transform = ``;
          }
        },
      });
      gesture.enable();
    }
  }, [onSwipe]);

  const handleRangeChange = async (newValue) => {
    setStarRating(newValue);
    console.log("Selected Value:", newValue);
    await updateVotes(newValue);
    setAllowUserToRate(false);
  };

  return (
    <div className="card-container" ref={cardRef}>
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
