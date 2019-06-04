import axios from "axios";
import { setAlert } from "./alert";
import { GET_PROJECT, PROJECT_ERROR } from "./types";

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
      type: GET_PROJECT,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, "error")));
    }
    dispatch({
      type: PROJECT_ERROR
    });
  }
};
