import { combineReducers } from "redux";
import globalReducer from "./globalReducer";
import timeSeriesReducer from "./timeSeriesReducer";

export default combineReducers({
  global: globalReducer,
  timeSeries: timeSeriesReducer,
});
