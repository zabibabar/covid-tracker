import React from "react";
import { Provider } from "react-redux";
import Home from "./components/Home";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store";
import muiTheme from "./muiTheme";

const myTheme = createMuiTheme(muiTheme);

export default function App() {
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
