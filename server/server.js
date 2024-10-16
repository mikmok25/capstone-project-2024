const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");
const theatreRoute = require("./routes/theatreRoute");
const bookingRoute = require("./routes/bookingsRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);
app.use("/api/theatres", theatreRoute);
app.use("/api/bookings", bookingRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
