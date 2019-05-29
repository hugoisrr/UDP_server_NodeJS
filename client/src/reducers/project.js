import { PROJECT_SUCCESS, PROJECT_FAILED } from "../actions/types";

const initialState = {
  loading: true,
  isCreated: null,
  project: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROJECT_SUCCESS:
      return {
        ...state,
        ...payload,
        isCreated: true,
        loading: false
      };

    case PROJECT_FAILED:
      return {
        ...state,
        isCreated: false,
        loading: false
      };

    default:
      return state;
  }
}
