const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const authMiddleware = require("../middlewares/authMiddleware");

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
    const charge = await stripe.charges.create(
      {
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

module.exports = router;