import axios from "axios";
import { setAlert } from "./alert";
import { PROJECT_SUCCESS, PROJECT_FAILED } from "./types";

// Create Project
export const createProject = ({ name, description }) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, description });

  try {
    const res = await axios.post("/api/project", body, config);
    dispatch({
      type: PROJECT_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: PROJECT_FAILED
    });
  }
};
