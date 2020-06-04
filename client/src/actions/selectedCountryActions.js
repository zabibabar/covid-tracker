import { SET_SELECTED_COUNTRY, SELECTED_COUNTRY_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const setSelectedCountry = ({ country, countryTimeSeries }) => (
  dispatch
) => {
  dispatch(selectedCountryLoading);

  if (countryTimeSeries.length) {
    dispatch({
      type: SET_SELECTED_COUNTRY,
      name: country,
      data: countryTimeSeries,
    });
  } else dispatch(returnErrors("Data for this country does not exist", 404));
};

export const selectedCountryLoading = () => {
  return {
    type: SELECTED_COUNTRY_LOADING,
  };
};
