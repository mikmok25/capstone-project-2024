const router = require("express").Router();
const Movie = require("../models/movieModel");
const authMiddleware = require("../middlewares/authMiddleware");

//  Add a new movie

router.post("/add-movie", authMiddleware, async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    await newMovie.save();
    res.send({ success: true, message: "Movie added successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all movies
router.get("/get-movies", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Movies fetched successfully",
      data: movies,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Edit or Update a movie

router.post("/update-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndUpdate(req.body.movieId, req.body);
    res.send({ success: true, message: "Movie updated successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete a movie
router.post("/delete-movie", authMiddleware, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.body.movieId);
    res.send({ success: true, message: "Movie deleted successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get movie by id
router.get("/get-movie-by-id/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.send({
      success: true,
      data: movie,
      message: "Movie Fetched Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
