import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";

import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });

      navigate("/");
      navigate(location.pathname);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mb-2">
      <form action="">
        <div className="row">
          <div className=" col-8">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              className="form-control"
            />
          </div>

          <div className="col-4">
            <label htmlFor="rating">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="form-select"
              name=""
              id="rating"
            >
              <option disabled>Rating</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="Reveiw" className="form-label">
              Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="form-control"
              name=""
              id="Review"
              rows="3"
            ></textarea>
          </div>

          <button
            type="submit"
            onClick={handleSubmitReview}
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
