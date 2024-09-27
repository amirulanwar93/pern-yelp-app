import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import RestaurantFinder from "../apis/RestaurantFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } =
    useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        console.log(response.data);

        setSelectedRestaurant(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id, setSelectedRestaurant]);

  return (
    <div>
      {selectedRestaurant && (
        <>
          <div className="text-center display-1">
            {/* not working properly after hard refresh. need to comment and uncomment */}
            {/* {selectedRestaurant.restaurant.name} */}
          </div>
          <div className="text-center">
            {/* <StarRating rating={selectedRestaurant.restaurant.average_rating} /> */}
            <span className="text-warning ms-1">
              {/* ({selectedRestaurant.restaurant.count || "0"}) */}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedRestaurant.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;
