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

const path = require("path");
__dirname = path.resolve();

// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
