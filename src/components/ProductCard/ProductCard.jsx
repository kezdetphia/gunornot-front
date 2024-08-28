import React from "react";
import { IonImg, IonIcon } from "@ionic/react";
import { heart, close } from "ionicons/icons";
import StarIcon from "../StarIcon";
import useUpdateVotes from "../../hooks/useUpdateVotes";
import "./ProductCard.css";
import { useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import axios from "axios";

function ProductCard({ product, onVote }) {
  const { likes, dislikes, updateVotes } = useUpdateVotes(
    product.totalLikes,
    product.totalDislikes,
    product._id
  );

  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const token = localStorage.getItem("auth-token"); // Or get the token from cookies
  //       const response = await axios.get("http://localhost:3001/user/me", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  // console.log("logged user", user);

  const totalVotes = likes + dislikes;
  const ratingPercentage = (likes / totalVotes) * 100;
  const rating = (ratingPercentage / 100) * 5; // Convert percentage to a 5-star rating

  const getFillPercentage = (index) => {
    const diff = rating - index;
    if (diff >= 1) {
      return 100;
    } else if (diff > 0) {
      return diff * 100;
    } else {
      return 0;
    }
  };

  const handleVote = (type) => {
    updateVotes(type);
    onVote(type, product._id);
  };

  // Initialize Ionic Storage
  // const storage = new Storage();
  // storage.create();

  // useEffect(() => {
  //   const printToken = async () => {
  //     try {
  //       await storage.create();
  //       const token = await storage.get("auth-token");
  //       console.log("Token from storage:", token);
  //     } catch (error) {
  //       console.error("Error retrieving token:", error);
  //     }
  //   };

  //   printToken();
  // }, []);

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
