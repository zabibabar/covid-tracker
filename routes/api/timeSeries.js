const router = require("express").Router();
const covidData = require("../../models/covidData");
const updateCovidData = require("../../dbUpdate");

// @route   GET api/timeSeries
// @desc    Get timeSeries data for all countries
// @access  Public
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const sortBy = req.query.sortBy || "totalConfirmed";
  const order = parseInt(req.query.order) || -1;
  covidData
    .find({}, "country timeSeries -_id")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ [sortBy]: order })
    .then(async (countries) => {
      if (!Array.isArray(countries) || !countries.length)
        throw "Can't find that data matches the query";
      if (
        countries[0].timeSeries[
          countries[0].timeSeries.length - 1
        ].date.getTime() +
          2 * 86400000 >
        Date.now()
      )
        return countries;

      await updateCovidData();
      return covidData
        .find({}, "country timeSeries -_id")
        .sort({ totalConfirmed: -1 });
    })
    .then((countries) => res.json(countries))
    .catch((error) => res.status(500).json({ error }));
});

// @route   GET api/timeSeries/:country
// @desc    Get country cases
// @access  Public
router.get("/:country", (req, res) => {
  covidData
    .find({ country: req.params.country }, "country timeSeries -_id")
    .then(async (country) => {
      if (
        country[0].timeSeries[country[0].timeSeries.length - 1].date.getTime() +
          2 * 86400000 >
        Date.now()
      )
        return country;
      console.log("Longer than 2 days");
      await updateCovidData();
      return covidData.find(
        { country: req.params.country },
        "country timeSeries -_id"
      );
    })
    .then((country) => res.json(country))
    .catch((error) => res.status(500).json({ error }));
});

module.exports = router;
