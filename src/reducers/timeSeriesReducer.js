import { GET_TIME_SERIES, TIME_SERIES_LOADING } from "../actions/types";

const initialState = {
  data: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TIME_SERIES:
      return {
        ...state,
        data: action.payload,
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
