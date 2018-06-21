import stagesReducer from "./stages/stagesReducer";
import teamReducer from "./team/teamReducer";
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

export const kanbanProjectReducers = combineReducers({
  stages: stagesReducer,
  team: teamReducer,
  form: formReducer
});
