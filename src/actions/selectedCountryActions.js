import { SET_SELECTED_COUNTRY, SELECTED_COUNTRY_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const setSelectedCountry = (country) => (dispatch, getState) => {
  dispatch(selectedCountryLoading);

  const timeSeries = getState().timeSeries.data;
  const data = timeSeries[country];

  if (data) {
    dispatch({
      type: SET_SELECTED_COUNTRY,
      name: country,
      data: data,
    });
  } else dispatch(returnErrors("Data for this country does not exist", 404));
};

export const selectedCountryLoading = () => {
  return {
    type: SELECTED_COUNTRY_LOADING,
  };
};
