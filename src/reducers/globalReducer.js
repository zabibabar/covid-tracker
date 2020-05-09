import { GET_GLOBAL, GLOBAL_LOADING } from "../actions/types";

const initialState = {
  data: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_GLOBAL:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case GLOBAL_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
