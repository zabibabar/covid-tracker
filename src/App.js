import React from "react";
import { Provider } from "react-redux";
import Navbar from "../src/components/Navbar";
import CountryList from "../src/components/Sidebar/CountryList";
import CountryCharts from "../src/components/CountryCharts";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CountryList />
      <CountryCharts />
    </Provider>
  );
}

export default App;
