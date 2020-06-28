import React from "react";
import { Provider } from "react-redux";
import Home from "./components/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ReactGA from "react-ga";

import store from "./store";
import muiTheme from "./muiTheme";
import { useEffect } from "react";

const myTheme = createMuiTheme(muiTheme);

export default function App() {
  useEffect(() => {
    ReactGA.initialize("UA-171022471-1");
    ReactGA.pageview("/");
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={myTheme}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}
