const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");
const Booking = require("../models/bookingModel");
const Show = require("../models/showModel");

// make payment
router.post("/make-payment", authMiddleware, async (req, res) => {
  try {
    const { token, amount } = req.body;

    // Create a customer

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    //  charge the customer
    const charge = await stripe.charges.create({
      amount: Math.round(amount),
      currency: "cad",
      customer: customer.id,
      receipt_email: token.email,
      description: "Ticket Booked for Movie",
    });

    const transactionId = charge.id;

    res.send({
      success: true,
      message: "Payment successful",
      data: transactionId,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Book shows

router.post("/book-show", authMiddleware, async (req, res) => {
  try {
    // Save booking
    const newBooking = new Booking(req.body);
    await newBooking.save();

    const show = await Show.findById(req.body.show);

    // Update Seats
    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...show.bookedSeats, ...req.body.seats],
    });

    res.send({
      success: true,
      message: "Booking successful",
      data: newBooking,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all bookings by user
router.get("/get-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.body.userId })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "movies",
        },
      })
      .populate("user")
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "theatres",
        },
      });

    res.send({
      success: true,
      message: "Bookings fetched successfully",
      data: bookings,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
