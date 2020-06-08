import {
  GET_TIME_SERIES,
  TIME_SERIES_LOADING,
  SET_SELECTED_COUNTRY,
  SELECTED_COUNTRY_LOADING,
} from "./types";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getTimeSeries = () => (dispatch) => {
  dispatch(timeSeriesLoading());
  dispatch(selectedCountryLoading());

  console.log("API called");
  axios
    .get("api/timeSeries", {
      params: {
        sortBy: "totalActive",
      },
    })
    .then((res) => {
      dispatch({
        type: GET_TIME_SERIES,
        payload: res.data,
      });
      dispatch({
        type: SET_SELECTED_COUNTRY,
        name: res.data[0].country,
        data: res.data[0].timeSeries,
      });
    })
    .catch((err) => dispatch(returnErrors(err, 404)));
};

export const timeSeriesLoading = () => {
  return {
    type: TIME_SERIES_LOADING,
  };
};

export const selectedCountryLoading = () => {
  return {
    type: SELECTED_COUNTRY_LOADING,
  };
};
