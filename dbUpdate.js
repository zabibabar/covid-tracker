const axios = require("axios");
const CovidData = require("./models/covidData");

const updateCovidData = async () => {
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

const getData = async () => {
  const requestOptions = {
    method: "get",
    redirect: "follow",
  };
  const urlValues = ["confirmed", "deaths", "recovered"];
  const URLs = urlValues.map(
    (val) =>
      `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_${val}_global.csv`
  );
  const requests = URLs.map((URL) =>
    axios.get(URL, requestOptions).catch((err) => null)
  );

  try {
    const [confirmed, death, recovered] = await axios.all(requests);

    let confirmedData = csvToJsonArray(confirmed.data).filter(
      (country) => !country["Province/State"] && country.Lat
    );
    let deathData = csvToJsonArray(death.data).filter(
      (country) => !country["Province/State"] && country.Lat
    );
    let recoveredData = csvToJsonArray(recovered.data).filter(
      (country) => !country["Province/State"] && country.Lat
    );

    addGlobalCasesTo(confirmedData);
    addGlobalCasesTo(deathData);
    addGlobalCasesTo(recoveredData);

    confirmedData = convertJsonArrayToKeyValue(confirmedData, "confirmed");
    deathData = convertJsonArrayToKeyValue(deathData, "deaths");
    recoveredData = convertJsonArrayToKeyValue(recoveredData, "recovered");

    const response = mergeJSONs(confirmedData, deathData, recoveredData);
    return response;
  } catch (error) {
    console.log("Error in getting data:", error.message);
  }
};

const csvToJsonArray = (str, quotechar = '"', delimiter = ",") => {
  const cutlast = (_, i, a) => i < a.length - 1;
  // const regex = /(?:[\t ]?)+("+)?(.*?)\1(?:[\t ]?)+(?:,|$)/gm; // no variable chars
  const regex = new RegExp(
    `(?:[\\t ]?)+(${quotechar}+)?(.*?)\\1(?:[\\t ]?)+(?:${delimiter}|$)`,
    "gm"
  );
  const lines = str.split("\n");
  const headers = lines[0].split(",");
  const list = [];

  for (const line of lines) {
    const val = {};
    for (const [i, m] of [...line.matchAll(regex)].filter(cutlast).entries()) {
      // Attempt to convert to Number if possible, also use null if blank
      if (i < headers.length)
        val[headers[i]] = m[2].length > 0 ? Number(m[2]) || m[2] : null;
    }
    list.push(val);
  }
  return list;
};

const addGlobalCasesTo = (jsonArray) => {
  const headers = Object.keys(jsonArray[0]).slice(4);
  const global = {
    "Province/State": null,
    "Country/Region": "World",
    Lat: 0.0,
    Long: 0.0,
  };
  headers.forEach((date) => {
    global[date] = 0;
  });

  jsonArray.forEach((country) => {
    headers.forEach((date) => {
      global[date] += parseInt(country[date]);
    });
  });

  jsonArray.push(global);
};

const convertJsonArrayToKeyValue = (data, name) => {
  const headers = Object.keys(data[0]).slice(4);
  const json = {};

  for (let i = 0; i < data.length; i++) {
    const countryArray = headers.map((val) => {
      const row = {};
      row.date = val;
      row[name] = parseInt(data[i][val]);
      return row;
    });
    json[data[i]["Country/Region"]] = countryArray;
  }

  Object.entries(json).forEach((country, timeSeries) => {});
  return json;
};

const mergeJSONs = (json1, json2, json3) => {
  let json = {};
  Object.keys(json1).forEach((country) => {
    json[country] = [];
    for (let i = 0; i < json1[country].length; i++) {
      const row = {
        date: json1[country][i].date,
        confirmed: json1[country][i].confirmed,
        newConfirmed:
          i > 0
            ? json1[country][i].confirmed - json1[country][i - 1].confirmed
            : json1[country][i].confirmed,
        deaths: json2[country][i].deaths,
        newDeaths:
          i > 0
            ? json2[country][i].deaths - json2[country][i - 1].deaths
            : json2[country][i].deaths,
        recovered: json3[country][i].recovered,
        newRecovered:
          i > 0
            ? json3[country][i].recovered - json3[country][i - 1].recovered
            : json3[country][i].recovered,
        active:
          json1[country][i].confirmed -
          json2[country][i].deaths -
          json3[country][i].recovered,
        newActive:
          i > 0
            ? json1[country][i].confirmed -
              json2[country][i].deaths -
              json3[country][i].recovered -
              (json1[country][i - 1].confirmed -
                json2[country][i - 1].deaths -
                json3[country][i - 1].recovered)
            : json1[country][i].confirmed -
              json2[country][i].deaths -
              json3[country][i].recovered,
      };
      json[country].push(row);
    }
  });

  return json;
};

module.exports = updateCovidData;

getData();
