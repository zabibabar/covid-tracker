import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "../src/components/Navbar";
import CountryList from "../src/components/CountryList";
import CountryDetails from "../src/components/CountryDetails";

function App() {
  return (
    <Container maxWidth="md">
      <Navbar />
      <Router>
        <Switch>
          <Route path="/:country">
            <CountryDetails />
          </Route>
          <Route path="/">
            <CountryList />
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
