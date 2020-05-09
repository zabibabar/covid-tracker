import {
  SET_SELECTED_COUNTRY,
  SELECTED_COUNTRY_LOADING,
} from "../actions/types";

const initialState = {
  country: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_SELECTED_COUNTRY:
      return {
        ...state,
        country: action.payload,
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
