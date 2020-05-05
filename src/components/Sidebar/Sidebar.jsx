import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./CountryList";

export default function Sidebar() {
  const [globalData, setGlobalData] = useState({});
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("globalData")) {
      setGlobalData(JSON.parse(localStorage.getItem("globalData")));
      setCountriesData(JSON.parse(localStorage.getItem("countriesData")));
      console.log("Local Storage used");
    } else {
      axios.get("https://api.covid19api.com/summary").then((res) => {
        console.log("Api Called");
        setGlobalData(res.data.Global);
        setCountriesData(res.data.Countries);
        localStorage.setItem("globalData", JSON.stringify(res.data.Global));
        localStorage.setItem(
          "countriesData",
          JSON.stringify(res.data.Countries)
        );
      });
    }
  }, []);

  countriesData.sort(GetSortOrder("TotalConfirmed"));
  return <CountryList countries={countriesData} />;
}

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
