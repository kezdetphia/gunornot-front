import React from "react";

const StarIcon = ({ rating, maxStars = 10 }) => {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = maxStars - Math.ceil(rating);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <SingleStar key={`full-${index}`} fillPercentage={100} />
      ))}
      {partialStar > 0 && (
        <SingleStar key="partial" fillPercentage={partialStar * 100} />
      )}
      {[...Array(emptyStars)].map((_, index) => (
        <SingleStar key={`empty-${index}`} fillPercentage={0} />
      ))}
    </>
  );
};

const SingleStar = ({ fillPercentage }) => {
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
          <stop offset="0%" stopColor="gold" />
          <stop offset={`${fillPercentage}%`} stopColor="gold" />
          <stop
            offset={`${fillPercentage}%`}
            stopColor="rgba(255, 255, 255, 0.7)"
          />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.7)" />
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
