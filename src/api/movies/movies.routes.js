const express = require("express");
const Movie = require("./movies.model");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");
const { isAuth } = require("../../middlewares/auth");
const router = express.Router();

//* FUNCION QUE RECOGE TODOS LAS MOVIES
router.get("/", async (req, res) => {
  try {
    const allMovies = await Movie.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
});

//* FUNCION QUE RECOGE UNA MOVIE POR ID
router.get("/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    const movieToFind = await Movie.findById(id);
    return res.status(200).json(movieToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* FUNCIÓN QUE CREA UNA MOVIE
// lo que va dentro de upload.single es el campo del model en el que va la imagen
router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const movie = req.body;
    const newMovie = new Movie(movie);
    if (req.file) {
        newMovie.image = req.file.path;
    }
    const created = await newMovie.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear el personaje");
  }
});

//* FUNCIÓN QUE ELIMINA UNA MOVIE
router.delete("/delete/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar el personaje");
  } catch (error) {
    return res.status(500).json("Error al borrar el personaje");
  }
});

//* FUNCIÓN QUE EDITA UNA MOVIE
router.put("/edit/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    const movie = req.body;
    const movieModify = new Movie(movie);
    movieModify._id = id;
    const movieUpdated = await Movie.findByIdAndUpdate(
      id,
      movieModify
    );
    return res
      .status(200)
      .json({
        mensaje: "Se ha conseguido editar el personaje",
        movieModificado: movieUpdated,
      });
  } catch (error) {
    return res.status(500).json("Error al editar el personaje");
  }
});

module.exports = router;