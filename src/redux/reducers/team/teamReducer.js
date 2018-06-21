import { combineReducers } from "redux";

import usersReducer from "../users/usersReducer";

const teamReducer = combineReducers({
  name: (state = "") => state,
  users: usersReducer
});

export default teamReducer;
