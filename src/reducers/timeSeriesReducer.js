import { GET_TIMESERIES, TIMESERIES_LOADING } from "../actions/types";

const initialState = {
  data: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIMESERIES:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case TIMESERIES_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
