const router = require("express").Router();
const covidData = require("../../models/covidData");

// @route   GET api/timeSeries
// @desc    Get timeSeries data for all countries
// @access  Public
router.get("/", (req, res) => {
  covidData
    .find()
    .select("country timeSeries -_id")
    .then((countries) => res.json(countries.slice(0, 10)))
    .catch((err) => res.status(500).json({ err }));
});

// @route   GET api/timeSeries/:country
// @desc    Get country cases
// @access  Public
router.get("/:country", (req, res) => {
  covidData
    .find({ country: req.params.country })
    .select("country timeSeries -_id")
    .sort({ totalConfirmed: -1 })
    .then((countries) => res.json(countries));
});

module.exports = router;
