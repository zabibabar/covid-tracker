import React, { useState, useEffect } from "react";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar/Sidebar";
import axios from "axios";
import CountryDetails from "../src/components/CountryDetails";

function App() {
  const [confirmed, setConfirmed] = useState({});
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("Confirmed") &&
      localStorage.getItem("Deaths") &&
      localStorage.getItem("Recovered")
    ) {
      setConfirmed(JSON.parse(localStorage.getItem("Confirmed")));
      setDeaths(JSON.parse(localStorage.getItem("Deaths")));
      setRecovered(JSON.parse(localStorage.getItem("Recovered")));
    } else {
      const requestOptions = {
        redirect: "follow",
      };

      axios
        .get(
          "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv",
          requestOptions
        )
        .then((response) => {
          localStorage.setItem(
            "Confirmed",
            JSON.stringify(csvToJson(response.data))
          );
          setConfirmed(JSON.parse(localStorage.getItem("Confirmed")));
        })
        .catch((error) => console.log("error", error));

      axios
        .get(
          "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv",
          requestOptions
        )
        .then((response) => {
          localStorage.setItem(
            "Deaths",
            JSON.stringify(csvToJson(response.data))
          );
          setDeaths(JSON.parse(localStorage.getItem("Deaths")));
        })
        .catch((error) => console.log("error", error));

      axios
        .get(
          "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv",
          requestOptions
        )
        .then((response) => {
          localStorage.setItem(
            "Recovered",
            JSON.stringify(csvToJson(response.data))
          );
          setRecovered(JSON.parse(localStorage.getItem("Recovered")));
        })
        .catch((error) => console.log("error", error));
    }
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <CountryDetails
        confirmed={confirmed}
        deaths={deaths}
        recovered={recovered}
      />
    </>
  );

  function csvToJson(str, quotechar = '"', delimiter = ",") {
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
      for (const [i, m] of [...line.matchAll(regex)]
        .filter(cutlast)
        .entries()) {
        // Attempt to convert to Number if possible, also use null if blank
        val[headers[i]] = m[2].length > 0 ? Number(m[2]) || m[2] : null;
      }
      list.push(val);
    }
    return list;
  }
}

export default App;
