import { actions } from "../../constants";
import _ from "lodash";

const usersReducer = (state = [], action) => {
  if (action.type === actions.addTeamMember) {
    const {
      payload: { firstname, lastname }
    } = action;
    const id = state.length + 1;
    const newUser = [
      {
        id,
        firstname,
        lastname,
        tasks: []
      }
    ];
    return [...state, ...newUser];
  }

  if (action.type === actions.removeTeamMember) {
    _.remove(state, { id: action.payload.id });
    return state;
  }

  return [...state];
};

export default usersReducer;
