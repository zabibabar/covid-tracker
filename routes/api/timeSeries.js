const router = require("express").Router();
const covidData = require("../../models/covidData");
const updateCovidData = require("../../dbUpdate");
const redis = require("redis");

const REDIS_URL = process.env.REDIS_URL || 6379;
const client = redis.createClient(REDIS_URL);

client.on("error", function (error) {
  console.error(error);
});
// @route   GET api/timeSeries
// @desc    Get timeSeries data for all countries
// @access  Public
router.get("/", (req, res) => {
  client.get("timeSeries", (err, data) => {
    if (err) throw err;
    else if (data !== null) {
      console.log("cache used");
      return res.json(JSON.parse(data));
    } else {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 185;
      const sortBy = req.query.sortBy || "totalConfirmed";
      const order = parseInt(req.query.order) || -1;
      covidData
        .find({}, "country lastUpdated timeSeries -_id")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ [sortBy]: order })
        .then(async (countries) => {
          if (!Array.isArray(countries) || !countries.length) {
            throw "Can't find data matches the query";
          }
          if (countries[0].lastUpdated.getTime() + 86400000 > Date.now()) {
            console.log("Data is younger a day");
            return countries;
          }

          console.log("Data is older than a day");
          await updateCovidData();
          return covidData
            .find({}, "country timeSeries -_id")
            .sort({ totalConfirmed: -1 });
        })
        .then((countries) => {
          console.log("caching response");
          client.setex(
            "timeSeries",
            86400000,
            JSON.stringify(countries),
            (err, res) => {
              console.log("error", err);
              console.log("res", res);
            }
          );
          console.log("Sending Response");
          res.json(countries);
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
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
