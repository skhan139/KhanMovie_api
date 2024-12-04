## MyFlix DB

A movie management system API offering features like movie information retrieval, user management, authentication, and data validation to ensure smooth operation.

## Features
Movies API: Retrieve movie details by title, genre, or director.
User Management: Administer users and their favorite movies.
Authentication: Secured by JWT for safe user access.
Swagger Documentation: Explore the interactive API documentation.
Data Validation: Guarantees data integrity and consistency across the system.
Technologies
Express.js: A lightweight Node.js framework for building the API.
MongoDB: A NoSQL database for storing user and movie data.
Mongoose: ODM (Object Data Modeling) tool for MongoDB integration.
Passport.js: Middleware used for handling authentication.
Swagger: Tool for generating live API documentation.
Cors: Middleware for managing cross-origin requests.
Bcrypt: A library for hashing passwords securely.

## API Endpoints
Movies

GET /movies: Retrieve a list of all movies.
GET /movies/:title: Fetch a specific movie by its title.
GET /movies/genre/:name: Get all movies from a specific genre.
GET /director/:name: Retrieve movies by a particular director.

Users

GET /users: Get a list of all registered users.
POST /users: Create a new user in the system.
PUT /users/:username: Update an existing user’s details.
DELETE /users/:username: Remove a user from the system.
POST /users/:username/movies/:MovieID: Add a movie to a user's favorites.
DELETE /users/:username/movies/:MovieID: Remove a movie from a user's favorites.
