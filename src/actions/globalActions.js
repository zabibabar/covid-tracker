import { GET_GLOBAL, GLOBAL_LOADING } from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getGlobal = () => (dispatch) => {
  dispatch(setGlobalLoading());
  getData()
    .then((data) =>
      dispatch({
        type: GET_GLOBAL,
        payload: data,
      })
    )
    .catch((err) => dispatch(returnErrors(err, 404)));
};

export const setGlobalLoading = () => {
  return {
    type: GLOBAL_LOADING,
  };
};

const getDateString = (n) => {
  const daysToMs = (n) => {
    return n * 24 * 60 * 60 * 1000;
  };
  const date = new Date(Date.now() - daysToMs(n));
  const format = new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const [month, , day, , year] = format.formatToParts(date);

  return `${month.value}-${day.value}-${year.value}`;
};

const getData = async (n = 0) => {
  const maxTries = 5;
  const requestOptions = {
    method: "get",
    url: `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${getDateString(
      n
    )}.csv`,
    redirect: "follow",
  };

  try {
    const response = await axios(requestOptions);
    if (response.status === 200) {
      let data = csvToJson(response.data);
      data = data.filter((country) => !country["Province_State"]).slice(0, -1);
      return data.sort(GetSortOrder("Confirmed"));
    } else {
      return n + 1 < maxTries
        ? getData(n + 1)
        : "No Updates in the last 5 days";
    }
  } catch (error) {
    console.log("error", error);
    return n + 1 < maxTries ? getData(n + 1) : "No Updates in the last 5 days";
  }
};

function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return -1;
    } else if (a[prop] < b[prop]) {
      return 1;
    }
    return 0;
  };
}

export const csvToJson = (str, quotechar = '"', delimiter = ",") => {
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
