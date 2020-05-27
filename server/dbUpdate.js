const axios = require("axios");
const CovidData = require("./models/covidData");

const updateMongoData = async () => {
  try {
    const data = await getData();
    CovidData.find()
      .then((countries) => {
        countries.forEach(async (row) => {
          try {
            const res = await CovidData.updateOne(
              { country: row.country },
              {
                totalConfirmed:
                  data[row.country][data[row.country].length - 1].confirmed,
                newConfirmed:
                  data[row.country][data[row.country].length - 1].newConfirmed,
                totalDeaths:
                  data[row.country][data[row.country].length - 1].deaths,
                newDeaths:
                  data[row.country][data[row.country].length - 1].newDeaths,
                totalRecovered:
                  data[row.country][data[row.country].length - 1].recovered,
                newRecovered:
                  data[row.country][data[row.country].length - 1].newRecovered,
                totalActive:
                  data[row.country][data[row.country].length - 1].active,
                newActive:
                  data[row.country][data[row.country].length - 1].newActive,
                timeSeries: data[row.country],
                lastUpdated: Date.now(),
              }
            );
          } catch (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => console.log(err));
  } catch (err) {
    console.log(err);
  }
};

const updateMongoData2 = async () => {
  try {
    const countries = await CovidData.find();
    if (countries[0].lastUpdated.getTime() + 24 * 60 * 60 * 1000 < Date.now()) {
      console.log("Been longer than a day");
      const data = await getData();
      countries.forEach(async (row) => {
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
      });
    } else {
      console.log("Been less than a day");
    }
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

    let confirmedData = csvToJson(confirmed.data).filter(
      (country) => !country["Province/State"] && country.Lat
    );
    let deathData = csvToJson(death.data).filter(
      (country) => !country["Province/State"] && country.Lat
    );
    let recoveredData = csvToJson(recovered.data).filter(
      (country) => !country["Province/State"] && country.Lat
    );

    confirmedData = convertTextToJSON(confirmedData, "confirmed");
    deathData = convertTextToJSON(deathData, "deaths");
    recoveredData = convertTextToJSON(recoveredData, "recovered");

    return mergeJSONs(confirmedData, deathData, recoveredData);
  } catch (error) {
    console.log(error.message);
  }
};

const csvToJson = (str, quotechar = '"', delimiter = ",") => {
  const cutlast = (_, i, a) => i < a.length - 1;
  // const regex = /(?:[\t ]?)+("+)?(.*?)\1(?:[\t ]?)+(?:,|$)/gm; // no variable chars
  const regex = new RegExp(
    `(?:[\\t ]?)+(${quotechar}+)?(.*?)\\1(?:[\\t ]?)+(?:${delimiter}|$)`,
    "gm"
  );
  const lines = str.split("\n");
  //const headers = lines.splice(0, 1)[0].match(regex).filter(cutlast);
  const headers = lines[0].split(",");
  const list = [];

  for (const line of lines) {
    const val = {};
    for (const [i, m] of [...line.matchAll(regex)].filter(cutlast).entries()) {
      // Attempt to convert to Number if possible, also use null if blank
      val[headers[i]] = m[2].length > 0 ? Number(m[2]) || m[2] : null;
    }
    list.push(val);
  }
  return list;
};

const convertTextToJSON = (data, name) => {
  const headers = Object.keys(data[0]).slice(4);
  const json = {};

  for (let i = 0; i < data.length - 1; i++) {
    const countryArray = headers.map((val) => {
      const row = {};
      row.date = val;
      row[name] = parseInt(data[i][val]);
      return row;
    });
    json[data[i]["Country/Region"]] = countryArray;
  }
  return json;
};

const mergeJSONs = (json1, json2, json3) => {
  let json = {};
  Object.keys(json1).map((country) => {
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
    return null;
  });
  return json;
};

//updateMongoData2();

module.exports = updateMongoData2;
