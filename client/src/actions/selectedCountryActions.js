import {
  SET_SELECTED_COUNTRY,
  SELECTED_COUNTRY_LOADING,
  DESLECT_COUNTRY,
} from "./types";
import { returnErrors } from "./errorActions";

export const setSelectedCountry = ({ country, countryTimeSeries }) => (
  dispatch
) => {
  dispatch(selectedCountryLoading());

  if (countryTimeSeries.length) {
    dispatch({
      type: SET_SELECTED_COUNTRY,
      name: country,
      data: countryTimeSeries,
    });
  } else dispatch(returnErrors("Data for this country does not exist", 404));
};

export const deselectCountry = () => (dispatch, getState) => {
  console.log("HI");
  dispatch({ type: DESLECT_COUNTRY });
  dispatch(selectedCountryLoading());

  console.log(getState());

  const [country] = getState().timeSeries.data.filter(
    (country) => country.country === "World"
  );

  console.log(country);

  dispatch({
    type: SET_SELECTED_COUNTRY,
    name: country.country,
    data: country.timeSeries,
  });
};

export const selectedCountryLoading = () => {
  return {
    type: SELECTED_COUNTRY_LOADING,
  };
};
