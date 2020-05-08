import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CountryDetails() {
  const [confirmed, setConfirmed] = useState({});
  const [death, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  useEffect(() => {
    function StoreInLocalStorage(confirmedData, deathData, recoveredData) {
      localStorage.setItem("confirmed", confirmedData);
      localStorage.setItem("death", deathData);
      localStorage.setItem("recovered", recoveredData);
    }

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

        const confirmedData = csvToJson(confirmed.data);
        const deathData = csvToJson(death.data);
        const recoveredData = csvToJson(recovered.data);

        return [confirmedData, deathData, recoveredData];
      } catch (error) {
        console.log(error.message);
      }
    };

    async function fetchAndConvertData() {
      let [confirmedData, deathData, recoveredData] = await getData();
      confirmedData = convertTextToJSON(confirmedData, "confirmed");
      deathData = convertTextToJSON(deathData, "death");
      recoveredData = convertTextToJSON(recoveredData, "recovered");

      setConfirmed(confirmedData);
      setDeaths(deathData);
      setRecovered(recoveredData);

      StoreInLocalStorage(confirmedData, deathData, recoveredData);
    }

    if (
      localStorage.getItem("confirmed") &&
      localStorage.getItem("death") &&
      localStorage.getItem("recovered")
    ) {
      StoreInLocalStorage();
      console.log("Local Storage Used");
    } else {
      fetchAndConvertData();
      console.log("JHU CSV Downloaded");
    }
  }, []);

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
      for (const [i, m] of [...line.matchAll(regex)]
        .filter(cutlast)
        .entries()) {
        // Attempt to convert to Number if possible, also use null if blank
        val[headers[i]] = m[2].length > 0 ? Number(m[2]) || m[2] : null;
      }
      list.push(val);
    }
    return list;
  };

  const convertTextToJSON = (data, name) => {
    const headers = Object.keys(data[0]).slice(4);
    //console.log(headers);
    //console.log(data);

    const json = { [name]: {} };

    for (let i = 1; i < data.length - 1; i++) {
      const countryArray = headers.map((val) => {
        const row = {};
        row.name = val;
        row.data = parseInt(data[i][val]);
        return row;
      });
      json[name][data[i]["Country/Region"]] = countryArray;
    }

    console.log(json);
    return json;
  };

  return <></>;
}
