import { actions } from "../../constants";
import _ from "lodash";
import shortid from "shortid";
const stagesReducer = (state = [], action) => {
  if (action.type === actions.addStage) {
    const {
      payload: { name }
    } = action;

    const order = state.length + 1;
    const newStage = [
      {
        order,
        name,
        tasks: []
      }
    ];
    return [...state, ...newStage];
  }

  if (action.type === actions.removeStage) {
    _.remove(state, { order: action.payload.order });
    return state;
  }

  if (action.type === actions.renameStage) {
    const index = _.findIndex(state, { order: action.payload.order });
    state[index].name = action.payload.name;
    return state;
  }

  if (action.type === actions.removeTask) {
    const {
      payload: { taskId, stageId }
    } = action;
    const matchedStageIndex = _.findIndex(state, { order: stageId });
    const matchedTaskIndex = _.findIndex(state[matchedStageIndex].tasks, {
      id: taskId
    });

    delete state[matchedStageIndex].tasks[matchedTaskIndex];

    return state;
  }

  if (action.type === actions.addTask) {
    const {
      payload: { title, description, stageId }
    } = action;
    const matchedStageIndex = _.findIndex(state, { order: stageId });
    const id = shortid.generate();
    const newTask = {
      id,
      title,
      description
    };

    state[matchedStageIndex].tasks.push(newTask);

    return state;
  }

  if (action.type === actions.moveTask) {
    const {
      payload: { source, destination }
    } = action;
    const matchedSourceStageIndex = _.findIndex(state, {
      order: parseInt(source.stageId, 10)
    });
    const matchedDestinationStageIndex = _.findIndex(state, {
      order: parseInt(destination.stageId, 10)
    });
    if (source.stageId === destination.stageId) {
      return state;
    }
    const matchedTaskIndex = _.findIndex(state[matchedSourceStageIndex].tasks, {
      id: source.taskId
    });

    const clonedTask = state[matchedSourceStageIndex].tasks[matchedTaskIndex];

    delete state[matchedSourceStageIndex].tasks[matchedTaskIndex];

    state[matchedDestinationStageIndex].tasks.push(clonedTask);
    return state;
  }

  return state;
};

export default stagesReducer;
