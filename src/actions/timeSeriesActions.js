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

    console.log(confirmedData);

    confirmedData = convertTextToJSON(confirmedData);
    deathData = convertTextToJSON(deathData);
    recoveredData = convertTextToJSON(recoveredData);

    console.log(confirmedData);
    return {
      confirmed: confirmedData,
      deaths: deathData,
      recovered: recoveredData,
    };
  } catch (error) {
    console.log(error.message);
  }
};

const convertTextToJSON = (data, name) => {
  const headers = Object.keys(data[0]).slice(4);
  const json = {};

  for (let i = 1; i < data.length - 1; i++) {
    const countryArray = headers.map((val) => {
      const row = {};
      row.name = val;
      row.data = parseInt(data[i][val]);
      return row;
    });
    json[data[i]["Country/Region"]] = countryArray;
  }
  return json;
};
