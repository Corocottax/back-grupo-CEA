const express = require('express');
const UserRoutes = require('./src/api/users/users.routes');
const MoviesRoutes = require("./src/api/movies/movies.routes");
const GenresRoutes = require("./src/api/genres/genres.routes");
const cors = require("cors");
require("dotenv").config();
const db = require('./src/utils/database/db');
const cloudinary = require("cloudinary").v2;

db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
})

const server = express();
const PORT = 3000;

server.use(cors({
  origin: "*",
  credentials: true
}))

/* server.use(cors()); */

server.use(express.json({limit: "5mb"}));

server.use(express.urlencoded({ extended: false }));

server.use('/movies', MoviesRoutes);
server.use('/genres', GenresRoutes);
server.use('/users', UserRoutes);

server.listen(PORT, () => {
  console.log(`Servidor a todo gas en http://localhost:${PORT}`);
});