const express = require("express");
const { getAllmovie, deleteMovie, editMovie, updateMovie, addMoive} = require("../controller/movie.controller");
const uploadImage = require("../middleware/uploadimage");

const routes = express.Router();

routes.get("/", getAllmovie);

routes.get("/add-movie", (req, res) => { res.render("addMovie"); });

routes.post("/add-movie", uploadImage.single('image'), addMoive);

routes.get("/delete-movie/:id", deleteMovie);

routes.get("/edit-movie/:id", editMovie);

routes.post("/update-movie/:id", uploadImage.single('image'), updateMovie);

module.exports = routes;
