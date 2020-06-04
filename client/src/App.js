import React from "react";
import { Provider } from "react-redux";
import Header from "./components/Sidebar/Header";
import CountryList from "../src/components/Sidebar/CountryList";
import CountryDetails from "../src/components/CountryDetails";
import { makeStyles } from "@material-ui/core/styles";
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
      <Header />
      <div className={classes.root}>
        <CountryList />
        <CountryDetails />
      </div>
    </Provider>
  );
}

export default App;
