const router = require("express").Router();
const covidData = require("../../models/covidData");

// @route   GET api/countries
// @desc    Get all countries cases
// @access  Public
router.get("/", (req, res) => {
  covidData
    .find({}, "-timeSeries -_id -__v")
    .sort({ totalConfirmed: -1 })
    .then(async (countries) => {
      res.json(countries);
    })
    .catch((err) => res.status(500).json({ err }));
});

// @route   GET api/countries/list
// @desc    Gets the name of all countries
// @access  Public
router.get("/list", (req, res) => {
  covidData
    .find()
    .select("country -_id")
    .sort({ country: 1 })
    .then((countries) => res.json(countries))
    .catch((err) => res.status(500).json({ err }));
});

// @route   GET api/countries/:country
// @desc    Get country cases
// @access  Public
router.get("/:country", (req, res) => {
  covidData
    .find({ country: req.params.country }, "-timeSeries -_id -__v")
    .sort({ totalConfirmed: -1 })
    .then(async (countries) => {
      res.json(countries);
    })
    .catch((err) => res.status(500).json({ err }));
});

module.exports = router;
