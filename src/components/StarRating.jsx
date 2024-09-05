import React, { useState } from "react";

const StarRating = ({ totalStars, value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(null);

  const handleClick = (newValue) => {
    onChange(newValue);
  };

  const handleMouseEnter = (newValue) => {
    setHoverValue(newValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const renderStar = (index) => {
    const isFilled = index < (hoverValue ?? value);
    return (
      <ion-icon name="star"></ion-icon>
      // <FaStar
      //   key={index}
      //   onClick={() => handleClick(index + 1)}
      //   onMouseEnter={() => handleMouseEnter(index + 1)}
      //   onMouseLeave={handleMouseLeave}
      //   color={isFilled ? "#FFD700" : "#e4e5e9"}
      //   style={{ cursor: "pointer", marginRight: 4 }}
      // />
    );
  };

  // return (
  //   <div>
  //     {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
  //   </div>
  // );
};

export default StarRating;
