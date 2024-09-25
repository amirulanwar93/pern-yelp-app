import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setName(response.data.data.name);
      setLocation(response.data.data.location);
      setPriceRange(response.data.data.price_range);
    };
    fetchData();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          id="name"
          placeholder=""
        />
      </div>
      <div className="mb-3">
        <label htmlFor="location" className="form-label">
          Location
        </label>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          className="form-control"
          id="location"
          placeholder=""
        />
      </div>
      <select
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
        className="form-select mb-3"
        id="price_range"
      >
        <option disabled>Price Range</option>
        <option value="1">$</option>
        <option value="2">$$</option>
        <option value="3">$$$</option>
        <option value="4">$$$$</option>
        <option value="5">$$$$$</option>
      </select>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};

export default UpdateRestaurant;
