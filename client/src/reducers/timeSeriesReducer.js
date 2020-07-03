import {
  GET_TIME_SERIES,
  TIME_SERIES_LOADING,
  SELECT_PAGE,
  GET_WORLDWIDE_TIME_SERIES,
} from "../actions/types";

const initialState = {
  worldWideData: {},
  data: [],
  selectedPage: 1,
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_WORLDWIDE_TIME_SERIES:
      return {
        ...state,
        worldWideData: action.data,
      };
    case GET_TIME_SERIES:
      return {
        ...state,
        data: [...state.data, action.data],
        loading: false,
      };
    case SELECT_PAGE:
      return {
        ...state,
        selectedPage: action.page,
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
