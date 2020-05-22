import { combineReducers } from "redux";
import timeSeriesReducer from "./timeSeriesReducer";
import selectedCountryReducer from "./selectedCountryReducer";

export default combineReducers({
  timeSeries: timeSeriesReducer,
  selectedCountry: selectedCountryReducer,
});
