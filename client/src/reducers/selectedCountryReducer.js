import {
  SET_SELECTED_COUNTRY,
  SELECTED_COUNTRY_LOADING,
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
    default:
      return state;
  }
}
