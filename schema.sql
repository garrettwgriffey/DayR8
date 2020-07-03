-- Code to copy and paste to make your own local instance of the database. You have to do this for the db to connect to your machine when we start the server and it goes to insert into the db automatically. We will also have to manually make a single local instance for Heroku to establish its online db on someone's computer, after that it is good to go (if we have heroku issues, we troubleshoot from that person's computer (needing to drop db specifically))

-- Heroku setup
DROP DATABASE IF EXISTS wh9vaw41o85ds5ll;

CREATE DATABASE wh9vaw41o85ds5ll;

-- Local database setup, copy paste this to create your own local instance in mysql workbench
DROP DATABASE IF EXISTS dayr8;

CREATE DATABASE dayr8;

USE dayr8;