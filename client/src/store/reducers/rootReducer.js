import devicesReducer from "./devicesReducer";
import projectReducer from "./projectReducer";
import workstationsReducer from "./workstationsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  devices: devicesReducer,
  project: projectReducer,
  workstationsReducer: workstationsReducer
});

export default rootReducer;
