import { actions } from "../../constants";

const errorReducer = (state = {}, action) => {
  if (action.type === actions.setError) {
    return { message: action.message };
  }
  if (action.type === actions.clearError) {
    return { message: "" };
  }
  return state;
};

export default errorReducer;
