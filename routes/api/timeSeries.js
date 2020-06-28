const router = require("express").Router();
const covidData = require("../../models/covidData");

// @route   GET api/timeSeries
// @desc    Get timeSeries data for all countries
// @access  Public
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 185;
  const sortBy = req.query.sortBy || "totalConfirmed";
  const order = parseInt(req.query.order) || -1;
  covidData
    .find({}, "country lastUpdated timeSeries -_id")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortBy]: order })
    .then((countries) => {
      if (!Array.isArray(countries) || !countries.length) {
        throw "Can't find data matches the query";
      }
      res.json(countries);
    })
    .catch((error) => res.status(500).json({ error }));
});

// @route   GET api/timeSeries/:country
// @desc    Get country cases
// @access  Public
router.get("/:country", (req, res) => {
  covidData
    .find({ country: req.params.country }, "country timeSeries -_id")
    .then((country) => {
      res.json(country);
    })
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
