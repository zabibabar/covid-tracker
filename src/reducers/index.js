import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import timeSeriesReducer from "./timeSeriesReducer";
import selectedCountryReducer from "./selectedCountryReducer";

export default combineReducers({
  global: globalReducer,
  timeSeries: timeSeriesReducer,
  selectedCountry: selectedCountryReducer,
});
