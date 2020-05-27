const model = require("mongoose").model;
const Schema = require("mongoose").Schema;

// Create TimeSeries Schema
const TimeSeriesSchema = new Schema({
  date: Date,
  confirmed: Number,
  newConfirmed: Number,
  deaths: Number,
  newDeaths: Number,
  recovered: Number,
  newRecovered: Number,
  active: Number,
  newActive: Number,
});

// Create CovidData Schema
const CovidDataSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  totalConfirmed: {
    type: Number,
    required: true,
  },
  newConfirmed: {
    type: Number,
    required: true,
  },
  totalDeaths: {
    type: Number,
    required: true,
  },
  newDeaths: {
    type: Number,
    required: true,
  },
  totalRecovered: {
    type: Number,
    required: true,
  },
  newRecovered: {
    type: Number,
    required: true,
  },
  totalActive: {
    type: Number,
    required: true,
  },
  newActive: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  timeSeries: [TimeSeriesSchema],
});

module.exports = CovidData = model("covidData", CovidDataSchema);
