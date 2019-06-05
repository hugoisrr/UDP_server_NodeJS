import devicesReducer from "./devicesReducer";
import locationsReducer from "./locationsReducer";
import projectReducer from "./projectReducer";
import workstationsReducer from "./workstationsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  devices: devicesReducer,
  locations: locationsReducer,
  project: projectReducer,
  workstationsReducer: workstationsReducer
});

export default rootReducer;
