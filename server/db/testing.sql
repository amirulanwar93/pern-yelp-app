CREATE TABLE
  products (
    id INT,
    NAME VARCHAR(50),
    price INT,
    on_sale BOOLEAN
  );

CREATE TABLE
  restaurants (
    id BIGSERIAL PRIMARY KEY,
    NAME VARCHAR(50) NOT NULL,
    LOCATION VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK (
      price_range >= 1
      AND price_range <= 5
    )
  );

SELECT
  ROW_NUMBER() OVER () AS serial_number,
  *
FROM
  restaurants
  LEFT JOIN (
    SELECT
      restaurant_id,
      COUNT(*),
      AVG(rating)::NUMERIC(10, 1) AS average_rating
    FROM
      reviews
    GROUP BY
      restaurant_id
  ) reviews ON restaurants.id = reviews.restaurant_id
ORDER BY
  serial_number DESC;

SELECT
  ROW_NUMBER() OVER () AS serial_number,
  *
FROM
  restaurants
  LEFT JOIN (
    SELECT
      restaurant_id,
      COUNT(*),
      AVG(rating)::NUMERIC(10, 1) AS average_rating
    FROM
      reviews
    GROUP BY
      restaurant_id
  ) reviews ON restaurants.id = reviews.restaurant_id
WHERE
  id = 3;

CREATE TABLE
  reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL REFERENCES restaurants (id),
    NAME VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (
      rating >= 1
      AND rating <= 5
    )
  );

SELECT
  *
FROM
  restaurants
  LEFT JOIN (
    SELECT
      restaurant_id,
      COUNT(*),
      AVG(rating)::NUMERIC(10, 1) AS average_rating
    FROM
      reviews
    GROUP BY
      restaurant_id
  ) reviews ON restaurants.id = reviews.restaurant_id;

SELECT
  *
FROM
  reviews
WHERE
  restaurant_id = 3
ORDER BY
  id DESC
LIMIT
  6;