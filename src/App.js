import React from "react";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar/Sidebar";
import CountryDetails from "../src/components/CountryDetails";

function App() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <CountryDetails />
    </>
  );
}

export default App;
