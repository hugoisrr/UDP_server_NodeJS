import { GET_PROJECT, PROJECT_ERROR } from "../actions/types";

const initialState = {
  loading: true,
  isCreated: null,
  project: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        isCreated: true,
        loading: false
      };

    case PROJECT_ERROR:
      return {
        ...state,
        project: null,
        isCreated: false,
        loading: false
      };

    default:
      return state;
  }
}
