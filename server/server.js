const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());

const userRoute = require("./routes/usersRoute");
const moviesRoute = require("./routes/moviesRoute");

app.use("/api/users", userRoute);
app.use("/api/movies", moviesRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
