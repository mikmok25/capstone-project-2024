const router = require("express").Router();
const Theatre = require("../models/theatreModel");
const authMiddleware = require("../middlewares/authMiddleware");

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

router.get("/get-all-theatres", async (req, res) => {
  try {
    const theatre = await Theatre.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      data: theatre,
      message: "Theatres fetched successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

