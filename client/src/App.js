import React from "react";
import { Provider } from "react-redux";
import Sidebar from "./components/Sidebar/Sidebar";
import CountryDetails from "../src/components/CountryDetails";
import { makeStyles } from "@material-ui/core/styles";
import store from "./store";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontFamily: "FiraGo, system-ui, sans-serif",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <Sidebar />
        <CountryDetails />
      </div>
    </Provider>
  );
}

export default App;
