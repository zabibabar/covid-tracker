import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./CountryList";

export default function Sidebar() {
  const [globalData, setGlobalData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("GlobalData")) {
      setGlobalData(JSON.parse(localStorage.getItem("GlobalData")));
    } else {
      const requestOptions = {
        redirect: "follow",
      };

      axios
        .get(
          "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/05-06-2020.csv",
          requestOptions
        )
        .then((response) => {
          let data = csvToJson(response.data);
          data = data.filter((country) => !country["Province_State"]);
          localStorage.setItem("GlobalData", JSON.stringify(data));
          setGlobalData(JSON.parse(localStorage.getItem("GlobalData")));
        })
        .catch((error) => console.log("error", error));
    }
  }, []);

  const data = globalData.sort(GetSortOrder("Confirmed"));
  data.pop();
  return <CountryList countries={data} />;

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
