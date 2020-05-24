const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const countries = require("./routes/api/countries");
const timeSeries = require("./routes/api/timeSeries");

const { MONGO_URI, MONGO_DB_NAME } = config;

const app = express();

// CORS Middleware
app.use(cors());

// DB Config
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/countries", countries);
app.use("/api/timeSeries", timeSeries);

// Listen on PORT 5000 if not set in environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
