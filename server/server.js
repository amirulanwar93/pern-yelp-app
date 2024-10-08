const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// List all restaurant
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const allRestaurants = await db.query(
      "SELECT ROW_NUMBER() OVER () AS serial_number, * FROM restaurants LEFT JOIN ( SELECT restaurant_id, COUNT(*), AVG(rating)::NUMERIC(10, 1) AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id = reviews.restaurant_id ORDER BY serial_number DESC"
    );

    res.status(200).json({
      status: "success",
      message: "List of Restaurants",
      length: allRestaurants.rows.length,
      data: { restaurants: allRestaurants.rows },
    });
  } catch (err) {
    console.error(err);
  }
});

// Get a restaurant by id and all reviews respective to it
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const restaurant = await db.query(
      "SELECT ROW_NUMBER() OVER () AS serial_number, * FROM restaurants LEFT JOIN ( SELECT restaurant_id, COUNT(*), AVG(rating)::NUMERIC(10, 1) AS average_rating FROM reviews GROUP BY restaurant_id ) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1 ORDER BY id DESC LIMIT 12",
      [id]
    );

    // if (!restaurant.rows[0]) {
    //   res.status(404).json({ status: "fail", message: "Restaurant not found" });
    // } else {
    res.status(200).json({
      status: "success",
      message: "Restaurant existed",
      data: { restaurant: restaurant.rows[0], reviews: reviews.rows },
    });
    // }
  } catch (err) {
    console.error(err);
  }
});

// Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const updateRestaurant = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );

    res.status(201).json({
      status: "success",
      message: "Restaurant created",
      data: { restaurant: updateRestaurant.rows[0] },
    });
  } catch (err) {
    console.error(err);
  }
});

// Update restaurant by id
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updateRestaurant = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, id]
    );
    res.status(200).json({
      status: "success",
      message: "Restaurant edited",
      data: { restaurant: updateRestaurant.rows[0] },
    });
  } catch (err) {
    console.error(err);
  }
});

// Delete restaurant by id
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedRestaurant = await db.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [id]
    );
    await db.query("DELETE FROM restaurants WHERE id = $1", [id]);
    res.status(204).json({
      status: "success",
      message: "Restaurant deleted",
      deletedData: { restaurant: deletedRestaurant.rows[0] },
    });
  } catch (err) {
    console.error(err);
  }
});

app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  try {
    const id = req.params.id;
    const addReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      message: "Review added",
      data: { review: addReview.rows[0] },
    });
  } catch (err) {
    console.error(err);
  }
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
