import React, { useState } from "react";
import { IonImg, IonIcon, IonButton, IonText } from "@ionic/react";
import { heart, close } from "ionicons/icons";
import StarIcon from "../StarIcon";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";

const ProductCard = React.memo(({ product, onVote }) => {
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

  // const [showModal, setShowModal] = useState(false);
  // const [selectedImage, setSelectedImage] = useState("");

  // const handleImageClick = (imgUrl) => {
  //   setSelectedImage(imgUrl);
  //   setShowModal(true);
  // };

  return (
    <div className="card-container">
      {/* Main Image */}
      <div className="main-image-container">
        <IonImg
          src={product.img[0]}
          alt={product.name}
          className="main-image"
          // onClick={() => handleImageClick(product.img[0])}
        />
        <div className="icon-container">
          <IonButton
            fill="clear"
            className="icon-button"
            onClick={() => handleVote("dislike")}
          >
            <IonIcon icon={close} className="icon close-icon" />
          </IonButton>
          <IonButton
            fill="clear"
            className="icon-button"
            onClick={() => handleVote("like")}
          >
            <IonIcon icon={heart} className="icon heart-icon" />
          </IonButton>
        </div>
        <div className="overlay">
          <div className="name-rating-container">
            <div className="name-overlay">{product.name}</div>
            <div className="rating-overlay">
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  fillPercentage={getFillPercentage(index)}
                />
              ))}
              <span className="rating-number">{rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <IonText className="description">{product.description}</IonText>

      {/* Additional Images */}
      <div className="additional-images">
        {product.img.slice(1).map((imgUrl, index) => (
          <IonImg
            key={index}
            src={imgUrl}
            alt={`${product.name}-${index}`}
            className="additional-image"
            // onClick={() => handleImageClick(imgUrl)}
          />
        ))}
      </div>

      {/* Modal for Full Image View */}
      {/* TODO: Since ionic swipe to close modal doesnt work need to find another solution to close modal */}
      {/* {isPlatform("ios") || isPlatform("android") ? (
        <div
          className={`modal-overlay ${showModal ? "show" : ""}`}
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setShowModal(false);
            }
          }}
        >
          <div className="modal-content">
            <IonImg src={selectedImage} className="modal-image" />
            <IonButton
              fill="clear"
              className="icon-button"
              onClick={() => setShowModal(false)}
            >
              <IonIcon icon={close} className="icon close-icon" />
            </IonButton>
          </div>
        </div>
      ) : null} */}
    </div>
  );
});

export default ProductCard;
