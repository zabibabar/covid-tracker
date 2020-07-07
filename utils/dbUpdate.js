const CovidData = require("../models/covidData");
const getData = require("./getDataFromGithub");

const updateCovidData = async () => {
  console.log("Making Update to Data");
  try {
    const countries = await CovidData.find();
    const data = await getData();
    await Promise.all(
      countries.map(async (row) => {
        await CovidData.updateOne(
          { country: row.country },
          {
            totalConfirmed:
              data[row.country][data[row.country].length - 1].confirmed,
            newConfirmed:
              data[row.country][data[row.country].length - 1].newConfirmed,
            totalDeaths: data[row.country][data[row.country].length - 1].deaths,
            newDeaths:
              data[row.country][data[row.country].length - 1].newDeaths,
            totalRecovered:
              data[row.country][data[row.country].length - 1].recovered,
            newRecovered:
              data[row.country][data[row.country].length - 1].newRecovered,
            totalActive: data[row.country][data[row.country].length - 1].active,
            newActive:
              data[row.country][data[row.country].length - 1].newActive,
            timeSeries: data[row.country],
            lastUpdated: Date.now(),
          }
        );
      })
    );
    console.log("Data updated");
  } catch (err) {
    console.log(err);
  }
};

const getMongoData = async () => {
  try {
    const data = await getData();
    let mongoData = [];
    Object.keys(data).forEach((country) => {
      const countryData = {
        country,
        totalConfirmed: data[country][data[country].length - 1].confirmed,
        newConfirmed: data[country][data[country].length - 1].newConfirmed,
        totalDeaths: data[country][data[country].length - 1].deaths,
        newDeaths: data[country][data[country].length - 1].newDeaths,
        totalRecovered: data[country][data[country].length - 1].recovered,
        newRecovered: data[country][data[country].length - 1].newRecovered,
        totalActive: data[country][data[country].length - 1].active,
        newActive: data[country][data[country].length - 1].newActive,
        timeSeries: data[country],
      };
      mongoData.push(countryData);
    });

    return mongoData;
  } catch {
    console.log("Error converting JSON to Mongo data");
  }
};

module.exports = updateCovidData;
