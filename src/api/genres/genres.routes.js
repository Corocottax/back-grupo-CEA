const express = require("express");
const Genre = require("./genres.model");
const upload = require("../../middlewares/file");
const { deleteFile } = require("../../middlewares/deleteFile");
const { isAuth } = require("../../middlewares/auth");
const router = express.Router();

//* FUNCION QUE RECOGE TODOS LOS GENEROS
router.get("/", async (req, res) => {
  try {
    const allGenres = await Genre.find().populate("movies");
    return res.status(200).json(allGenres);
  } catch (error) {
    return res.status(500).json("Error en el servidor");
  }
});

//* FUNCION QUE RECOGE UN GENERO POR ID
router.get("/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    const genreToFind = await Genre.findById(id);
    return res.status(200).json(genreToFind);
  } catch (error) {
    return res.status(500).json(error);
  }
});

//* FUNCIÓN QUE CREA UN GENERO
// lo que va dentro de upload.single es el campo del model en el que va la imagen
router.post("/create", async (req, res) => {
  try {
    const genre = req.body;
    console.log(req.body);
    const newGenre = new Genre(genre);
    console.log(newGenre);
    const created = await newGenre.save();
    return res.status(201).json(created);
  } catch (error) {
    return res.status(500).json("Error al crear el genero");
  }
});

//* FUNCIÓN QUE ELIMINA UN GENERO
router.delete("/delete/:id", [isAuth], async (req, res) => {
  try {
    const id = req.params.id;
    await Genre.findByIdAndDelete(id);
    return res.status(200).json("Se ha conseguido borrar el genero");
  } catch (error) {
    return res.status(500).json("Error al borrar el genero");
  }
});

//* FUNCIÓN QUE EDITA UN GENERO
router.put("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const genre = req.body;
    const genreModify = new Genre(genre);
    genreModify._id = id;
    const genreOld = await Genre.findById(id);
    genreOld.movies.push(genreModify.movies);
    genreModify.movies = [...genreOld.movies];
    console.log(genreModify);
    const genreUpdated = await Genre.findByIdAndUpdate(
      id,
      genreModify
    );
    return res
      .status(200)
      .json({
        mensaje: "Se ha conseguido editar el genero",
        genreModificado: genreUpdated,
      });
  } catch (error) {
    return res.status(500).json("Error al editar el genero");
  }
});

module.exports = router;