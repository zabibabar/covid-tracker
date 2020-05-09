import { GET_TIME_SERIES, TIME_SERIES_LOADING } from "../actions/types";

const initialState = {
  confirmed: {},
  deaths: {},
  recovered: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIME_SERIES:
      return {
        ...state,
        confirmed: action.payload.confirmed,
        deaths: action.payload.deaths,
        recovered: action.payload.recovered,
        loading: false,
      };
    case TIME_SERIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
