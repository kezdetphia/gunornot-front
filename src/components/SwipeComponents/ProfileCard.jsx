import React, { useEffect, useRef } from "react";
import "./ProfileCard.css";
import { IonText, IonCard, IonImg, createGesture } from "@ionic/react";
import { heart } from "ionicons/icons";

const ProfileCard = (props) => {
  const ref = useRef(null);

  useEffect(() => {
    gestureInit();
  }, []);

  const gestureInit = () => {
    const card = ref.current;
    if (card) {
      const gesture = createGesture({
        el: card,
        gestureName: "card-swipe",
        onMove: (detail) => {
          card.style.transform = `translateX(${detail.deltaX}px) rotate(${
            detail.deltaX / 20
          }deg)`;
          // if (detail.deltaX > 0) {
          //   props.Onmatch();
          // } else {
          //   props.OnUnmatch();
          // }
        },
        onEnd: (detail) => {
          const windowWidth = window.innerWidth;
          // props.onReset();
          card.style.transition =
            "0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
          if (detail.deltaX > windowWidth / 2) {
            card.style.transform = `translateX(${windowWidth * 1.5}px) `;
          } else if (detail.deltaX < -windowWidth / 2) {
            card.style.transform = `translateX(-${windowWidth * 1.5}px) `;
          } else {
            card.style.transform = ``;
          }
        },
        // direction: "x",
        // threshold: 10,
      });
      gesture.enable();
    }
  };

  return (
    <div ref={ref}>
      <IonCard>
        <div className="card-container">
          <div className="image-container">
            <IonImg src={props.img} />
          </div>
          <div className="details-container">
            <IonText className="name">{props.name}</IonText>
            <IonText className="bio">{props.description}</IonText>
          </div>
        </div>
      </IonCard>
      <IonCard>
        <IonText>{props.description}</IonText>
      </IonCard>
      <IonCard>
        <div className="card-container">
          {props.img.map((img, index) => (
            <div className="image-container">
              <IonImg key={index} src={img} />
            </div>
          ))}
        </div>
      </IonCard>
    </div>
  );
};

export default ProfileCard;
