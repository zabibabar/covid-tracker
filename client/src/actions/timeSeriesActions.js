import {
  GET_WORLDWIDE_TIME_SERIES,
  GET_TIME_SERIES,
  TIME_SERIES_LOADING,
  SET_SELECTED_COUNTRY,
  SELECT_PAGE,
} from "./types";
import { selectedCountryLoading } from "./selectedCountryActions";
import { returnErrors } from "./errorActions";
import axios from "axios";

export const getTimeSeries = () => async (dispatch) => {
  dispatch(timeSeriesLoading());
  dispatch(selectedCountryLoading());

  await axios
    .get("api/timeSeries", { params: { limit: 37 } })
    .then((res) => {
      dispatch({
        type: GET_WORLDWIDE_TIME_SERIES,
        data: res.data[0],
      });
      dispatch({
        type: GET_TIME_SERIES,
        data: res.data.slice(1),
      });
      dispatch({
        type: SET_SELECTED_COUNTRY,
        name: res.data[0].country,
        data: res.data[0].timeSeries,
      });
    })
    .catch((err) => dispatch(returnErrors(err, 404)));

  for (let i = 2; i <= 5; i++) {
    axios
      .get("api/timeSeries", { params: { page: i, limit: 37 } })
      .then((res) => {
        dispatch({
          type: GET_TIME_SERIES,
          data: res.data,
        });
      })
      .catch((err) => dispatch(returnErrors(err, 404)));
  }
};

export const selectPage = (page) => {
  return {
    type: SELECT_PAGE,
    page: page,
  };
};

export const timeSeriesLoading = () => {
  return {
    type: TIME_SERIES_LOADING,
  };
};
