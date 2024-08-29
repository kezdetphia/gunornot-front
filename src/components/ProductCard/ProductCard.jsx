import React from "react";
import { IonImg, IonIcon } from "@ionic/react";
import { heart, close } from "ionicons/icons";
import StarIcon from "../StarIcon";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";

function ProductCard({ product, onVote }) {
  const { likes, dislikes, updateVotes } = useUpdateVotes(
    product.totalLikes,
    product.totalDislikes
  );

  const totalVotes = likes + dislikes;
  const ratingPercentage = totalVotes ? (likes / totalVotes) * 100 : 0;
  const rating = (ratingPercentage / 100) * 5;

  const getFillPercentage = (index) => {
    const diff = rating - index;
    if (diff >= 1) return 100;
    if (diff > 0) return diff * 100;
    return 0;
  };

  const handleVote = async (type) => {
    const updatedProduct = await updateVotes(type, product._id);
    onVote(type, updatedProduct);
  };

  return (
    <div className="image-container">
      <IonImg
        src={product.img}
        alt={product.name}
        style={{ width: "100%", height: "auto" }}
      />
      <div className="name-overlay">{product.name}</div>
      <div className="rating-overlay">
        {[...Array(5)].map((_, index) => (
          <StarIcon key={index} fillPercentage={getFillPercentage(index)} />
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
      <div className="icon-container">
        <IonIcon
          icon={close}
          className="icon close-icon"
          onClick={() => handleVote("dislike")}
        />
        <IonIcon
          icon={heart}
          className="icon heart-icon"
          onClick={() => handleVote("like")}
        />
      </div>
    </div>
  );
}

export default ProductCard;
