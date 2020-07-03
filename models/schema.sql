-- Heroku setup
DROP DATABASE IF EXISTS wh9vaw41o85ds5ll;

CREATE DATABASE wh9vaw41o85ds5ll;

-- Local database setup
DROP DATABASE IF EXISTS restaurant_db;

CREATE DATABASE restaurant_db;

USE restaurant_db;

CREATE TABLE feelings (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL,
  emotion VARCHAR(45) NOT NULL,
  notes VARCHAR(500) NOT NULL,
   PRIMARY KEY (id)
);