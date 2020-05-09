import { SET_SELECTED_COUNTRY, SELECTED_COUNTRY_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const setSelectedCountry = ({ country, ...rest }) => (
  dispatch,
  getState
) => {
  dispatch(selectedCountryLoading);

  const timeSeries = getState().timeSeries;
  const confirmedData = timeSeries.confirmed[country];
  const deathsData = timeSeries.deaths[country];
  const recoveredData = timeSeries.recovered[country];

  if (confirmedData && deathsData && recoveredData) {
    let data = {
      name: country,
      ...rest,
      confirmedData,
      deathsData,
      recoveredData,
    };
    dispatch({
      type: SET_SELECTED_COUNTRY,
      payload: data,
    });
  } else dispatch(returnErrors("Data for this country does not exist", 404));
};

export const selectedCountryLoading = () => {
  return {
    type: SELECTED_COUNTRY_LOADING,
  };
};
