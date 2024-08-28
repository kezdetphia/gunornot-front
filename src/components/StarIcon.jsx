import React from "react";

const StarIcon = ({ fillPercentage }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`gradient-${fillPercentage}`}>
          <stop offset={`${fillPercentage}%`} stopColor="gold" />
          <stop
            offset={`${fillPercentage}%`}
            stopColor="rgba(255, 255, 255, 0.7)"
          />
        </linearGradient>
      </defs>
      <path
        d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
        fill={`url(#gradient-${fillPercentage})`}
      />
    </svg>
  );
};

export default StarIcon;
