import {
  SET_SELECTED_COUNTRY,
  SELECTED_COUNTRY_LOADING,
  DESLECT_COUNTRY,
} from "../actions/types";

const initialState = {
  name: "",
  countryTimeSeries: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        name: action.name,
        countryTimeSeries: action.data,
        loading: false,
      };
    case SELECTED_COUNTRY_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DESLECT_COUNTRY:
      return {
        ...state,
        name: "",
        countryTimeSeries: [],
        loading: false,
      };
    default:
      return state;
  }
}
