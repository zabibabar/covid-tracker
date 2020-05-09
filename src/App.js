import React from "react";
import { Provider } from "react-redux";
import Navbar from "../src/components/Navbar";
import CountryList from "../src/components/Sidebar/CountryList";
import CountryCharts from "../src/components/CountryCharts";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import store from "./store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Navbar />
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3}>
            <CountryList />
          </Grid>
          <Grid item xs={9}>
            <CountryCharts />
          </Grid>
        </Grid>
      </div>
    </Provider>
  );
}

export default App;
