const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// routes
const countries = require("./routes/api/countries");
const timeSeries = require("./routes/api/timeSeries");

const app = express();

// CORS Middleware
app.use(cors());

// DB Config
const db =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI
    : require("./config").MONGO_URI;

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => console.log(err));

// Use Routes
app.use("/api/countries", countries);
app.use("/api/timeSeries", timeSeries);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen on PORT 5000 if not set in environment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
