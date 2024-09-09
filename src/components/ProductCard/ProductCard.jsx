import React, { useState, useEffect, useRef } from "react";
import {
  IonImg,
  IonText,
  createGesture,
  // IonModal,
  // IonButton,
  // IonIcon,
} from "@ionic/react";
// import { close } from "ionicons/icons";
import StarRange from "../StarRange";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";
import StarIcon from "../StarIcon";

//TODO: Find solution how to close modal with swiping down,
// all related code is commented out as modal cant be closed on simulator when opened

// ProductCard component definition using React.memo for performance optimization
const ProductCard = React.memo(({ product, onSwipe, style }) => {
  const [starRating, setStarRating] = useState(0);
  const [allowUserToRate, setAllowUserToRate] = useState(true);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedImage, setSelectedImage] = useState("");
  const cardRef = useRef(null);
  // const modalRef = useRef(null);

  // Custom hook for updating votes
  const { updateVotes, rating } = useUpdateVotes(product?._id);

  // Effect for setting up swipe gesture
  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      const gesture = createGesture({
        el: card,
        gestureName: "card-swipe",
        onMove: (detail) => {
          // Update card position and rotation based on swipe
          card.style.transform = `translateX(${detail.deltaX}px) rotate(${
            detail.deltaX / 20
          }deg)`;
        },
        onEnd: (detail) => {
          const windowWidth = window.innerWidth;
          card.style.transition =
            "0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

          // Handle swipe left
          if (detail.deltaX > windowWidth / 2) {
            card.style.transform = `translateX(${windowWidth * 1.5}px)`;
            setTimeout(() => {
              onSwipe("left");
              card.style.transition = ""; // Reset transition to avoid animation conflicts
              card.style.transform = ""; // Reset transform after swipe completes
            }, 250);
          }
          // Handle swipe right
          else if (detail.deltaX < -windowWidth / 2) {
            card.style.transform = `translateX(-${windowWidth * 1.5}px)`;
            setTimeout(() => {
              onSwipe("right");
              card.style.transition = ""; // Reset transition to avoid animation conflicts
              card.style.transform = ""; // Reset transform after swipe completes
            }, 250);
          }
          // Reset card position if swipe is not far enough
          else {
            card.style.transform = ``;
          }
        },
      });
      gesture.enable();
    }
  }, [onSwipe]);

  // useEffect(() => {
  //   const card = cardRef.current;
  //   if (card) {
  //     const gesture = createGesture({
  //       el: card,
  //       gestureName: "card-swipe",
  //       onMove: (detail) => {
  //         // Update card position and rotation based on swipe
  //         card.style.transform = `translateX(${detail.deltaX}px) rotate(${
  //           detail.deltaX / 20
  //         }deg)`;
  //       },
  //       onEnd: (detail) => {
  //         const windowWidth = window.innerWidth;
  //         card.style.transition =
  //           "0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)";

  //         // Handle swipe left
  //         if (detail.deltaX > windowWidth / 2) {
  //           card.style.transform = `translateX(${windowWidth * 1.5}px)`;
  //           setTimeout(() => {
  //             onSwipe("left");
  //             card.style.transition = ""; // Reset transition to avoid animation conflicts
  //             card.style.transform = ""; // Reset transform after swipe completes
  //           }, 250);
  //         }
  //         // Handle swipe right
  //         else if (detail.deltaX < -windowWidth / 2) {
  //           card.style.transform = `translateX(-${windowWidth * 1.5}px)`;
  //           setTimeout(() => {
  //             onSwipe("right");
  //             card.style.transition = ""; // Reset transition to avoid animation conflicts
  //             card.style.transform = ""; // Reset transform after swipe completes
  //           }, 250);
  //         }
  //         // Reset card position if swipe is not far enough
  //         else {
  //           card.style.transform = ``;
  //         }
  //       },
  //     });
  //     gesture.enable();
  //   }
  // }, [onSwipe]);

  // Commented out effect for modal swipe gesture
  // useEffect(() => {
  //   const modal = modalRef.current;
  //   if (modal) {
  //     const gesture = createGesture({
  //       el: modal,
  //       gestureName: "modal-swipe",
  //       onMove: (detail) => {
  //         if (detail.deltaY > 0) {
  //           modal.style.transform = `translateY(${detail.deltaY}px)`;
  //         }
  //       },
  //       onEnd: (detail) => {
  //         if (detail.deltaY > 150) {
  //           setShowModal(false);
  //         } else {
  //           modal.style.transform = ``;
  //         }
  //       },
  //     });
  //     gesture.enable();
  //   }
  // }, [showModal]);

  // Handler for star rating change
  const handleRangeChange = async (newValue) => {
    setStarRating(newValue);
    console.log("Selected Value:", newValue);
    await updateVotes(newValue);
    setAllowUserToRate(false);
  };

  // Commented out handlers for image modal
  // const handleImageClick = (imgUrl) => {
  //   setSelectedImage(imgUrl);
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  return (
    <div className="card-container" ref={cardRef} style={style}>
      {/* Main Image */}
      <div className="main-image-container">
        <IonImg
          src={product.img[0]}
          alt={product.name}
          className="main-image"
          // onClick={() => handleImageClick(product.img[0])}
        />
        {/* Rating overlay for user input */}
        <div
          className={`rating-overlay ${allowUserToRate ? "visible" : "hidden"}`}
        >
          <StarRange starRating={starRating} onIonChange={handleRangeChange} />
        </div>
        {/* Rating overlay to display current rating */}
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
            // onClick={() => handleImageClick(imgUrl)}
          />
        ))}
      </div>

      {/* Commented out Modal for Full Image View */}
      {/* <IonModal isOpen={showModal} cssClass="modal-overlay" ref={modalRef}>
        <div className="modal-content">
          <IonImg src={selectedImage} className="modal-image" />
          <IonButton
            fill="clear"
            className="icon-button"
            onClick={handleCloseModal}
          >
            <IonIcon icon={close} className="icon close-icon" />
          </IonButton>
        </div>
      </IonModal> */}
    </div>
  );
});

export default ProductCard;
