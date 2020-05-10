import { GET_TIME_SERIES, TIME_SERIES_LOADING } from "./types";
import { returnErrors } from "./errorActions";
import { csvToJson } from "./globalActions";
import axios from "axios";

export const getTimeSeries = () => (dispatch) => {
  dispatch(timeSeriesLoading());
  getData()
    .then((data) =>
      dispatch({
        type: GET_TIME_SERIES,
        payload: data,
      })
    )
    .catch((err) => dispatch(returnErrors(err, 404)));
};

export const timeSeriesLoading = () => {
  return {
    type: TIME_SERIES_LOADING,
  };
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

    // return {
    //   confirmed: confirmedData,
    //   deaths: deathData,
    //   recovered: recoveredData,
    // };
  } catch (error) {
    console.log(error.message);
  }
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
        deaths: json2[country][i].deaths,
        recovered: json3[country][i].recovered,
      };
      json[country].push(row);
    }
    return null;
  });
  return json;
};
