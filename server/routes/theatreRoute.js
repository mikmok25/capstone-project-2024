const router = require("express").Router();
const Theatre = require("../models/theatreModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Show = require("../models/showModel");

// Add a new theatre

router.post("/add-theatre", async (req, res) => {
  try {
    const newTheatre = new Theatre(req.body);
    await newTheatre.save();
    res.send({
      success: true,
      message: "Theatre added successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
});

// Get all theatres

router.get("/get-all-theatres", async (req, res) => {
  try {
    const theatres = await Theatre.find()
      .populate("owner")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      data: theatres,
      message: "Theatres fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//  Get all theaters by owner
router.post("/get-all-theatres-by-owner", authMiddleware, async (req, res) => {
  try {
    const theatres = await Theatre.find({ owner: req.body.owner }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Theatres fetched successfully",
      data: theatres,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update theatre

router.post("/update-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndUpdate(req.body.theatreId, req.body);
    res.send({
      success: true,
      message: "Theatre updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete Theatre
router.post("/delete-theatre", async (req, res) => {
  try {
    await Theatre.findByIdAndDelete(req.body.theatreId);
    res.send({
      success: true,
      message: "Theatre Deleted Successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Add a new show to a theatre

router.post("/add-show", async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "Show added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all shows by theatre

router.post("/get-all-shows-by-theatre", async (req, res) => {
  try {
    const shows = await Show.find({ theatre: req.body.theatreId })
      .populate("movie")
      .sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Shows fetched successfully",
      data: shows,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete Show

router.post("/delete-show", async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "Show deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all unique theatres which have shows of a movie

router.post("/get-all-theatres-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;

    // Find all shows of a movie

    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ createdAt: -1 });


 

      // Get all unique theatres
      let uniqueTheatres = [];
      shows.forEach(show => {
        const theatre = uniqueTheatres.find(
          (theatre) => theatre._id == show.theatre._id
        );

        if (!theatre) {
          const showsForThisTheatre = shows.filter(
            (showObj) => showObj.theatre._id == show.theatre._id
          )
          uniqueTheatres.push({
            ...show.theatre._doc,
            shows: showsForThisTheatre,
          });
        }
      });
      res.send({
        success: true,
        message: "Theatres fetched successfully",
        data: uniqueTheatres,
      });

  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
