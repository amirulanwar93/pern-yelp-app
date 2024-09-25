import React from "react";

import StarRating from "./StarRating";

const Reviews = () => {
  return (
    <div className="row row-cols-3 mb-2">
      <div
        className="card text-bg-primary mb-3 me-4"
        style={{ maxWidth: "30%" }}
      >
        <div className="card-header d-flex justify-content-between">
          <span>Joan</span>
          <span>
            <StarRating rating={3} />
          </span>
        </div>
        <div className="card-body">
          <h5 className="card-title">Primary card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
