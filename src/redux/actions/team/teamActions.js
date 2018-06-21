import { actions } from "../../constants";

export const addTeamMember = payload => {
  return {
    type: actions.addTeamMember,
    payload
  };
};

export const removeTeamMember = payload => {
  return {
    type: actions.removeTeamMember,
    payload
  };
};
