import { actions } from "../../constants";

export const removeStage = payload => {
  return {
    type: actions.removeStage,
    payload
  };
};

export const renameStage = payload => {
  return {
    type: actions.renameStage,
    payload
  };
};

export const addStage = payload => {
  return {
    type: actions.addStage,
    payload
  };
};

export const removeTask = payload => {
  return {
    type: actions.removeTask,
    payload
  };
};

export const addTask = payload => {
  return {
    type: actions.addTask,
    payload
  };
};

export const moveTask = payload => {
  return {
    type: actions.moveTask,
    payload
  };
};
