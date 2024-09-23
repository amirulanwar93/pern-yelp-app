CREATE TABLE
  products (
    id INT,
    name VARCHAR(50),
    price INT,
    on_sale BOOLEAN
  );

CREATE TABLE
  restaurants (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK (
      price_range >= 1
      AND price_range <= 5
    )
  );