const CronJob = require("cron").CronJob;
const updateCovidData = require("./dbUpdate");

module.exports = new CronJob(
  "0 0 1 * * *",
  updateCovidData,
  null,
  false,
  "America/New_York"
);
