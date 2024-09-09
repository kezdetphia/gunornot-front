import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import "../components/ProductCard/ProductCard.css";

function StarRange({ min = 1, max = 11, step = 1, starRating, onIonChange }) {
  const [selectedStar, setSelectedStar] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);

  const stars = [];
  for (let i = min; i < max; i += step) {
    stars.push(
      <div
        key={i}
        className={`star-icon-container ${
          (hoveredStar !== null ? hoveredStar : selectedStar) >= i
            ? "selected"
            : ""
        }`}
        onClick={() => {
          setSelectedStar(i);
          onIonChange(i);
        }}
        onMouseEnter={() => setHoveredStar(i)}
        onMouseLeave={() => setHoveredStar(null)}
      >
        {(hoveredStar !== null ? hoveredStar : selectedStar) >= i ? (
          <FaStar className="star-icon filled" />
        ) : (
          <FaRegStar className="star-icon" />
        )}
      </div>
    );
  }

  return (
    <div className="star-range-container">
      <div className="stars-container">{stars}</div>
    </div>
  );
}

export default StarRange;
