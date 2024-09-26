import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];
  for (let index = 1; index <= 5; index++) {
    if (index <= rating) {
      stars.push(<i className="fa-solid fa-star text-warning"></i>);
    } else if (
      index === Math.ceil(rating) &&
      !Number.isInteger(rating) &&
      rating - Math.floor(rating) >= 0.5
    ) {
      stars.push(
        <i className="fa-regular fa-star-half-stroke text-warning"></i>,
      );
    } else {
      stars.push(<i className="fa-regular fa-star text-warning"></i>);
    }
  }
  return <>{stars}</>;
};

export default StarRating;
