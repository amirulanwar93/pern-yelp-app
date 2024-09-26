import React, { useContext, useState } from "react";

import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurants = () => {
  const { addRestaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post("/", {
        name,
        location,
        price_range: priceRange,
      });
      console.log(response);
      
      addRestaurants(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <form action="">
        <div className="row g-2">
          <div className="col-md">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Name"
            />
          </div>
          <div
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="col-md"
          >
            <input
              type="text"
              className="form-control"
              placeholder="Location"
            />
          </div>
          <div className="col-md">
            <select
              value={priceRange || 'DEFAULT'}
              onChange={(e) => setPriceRange(e.target.value)}
              className="form-select"
            >
              <option value={'DEFAULT'} disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="col-1">
            <button onClick={handleSubmit} className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurants;
