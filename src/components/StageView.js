import React, { Component } from "react";
import TaskList from "../components/TaskList";
import { actions } from "../redux/constants";
import { DragDropContext } from "react-beautiful-dnd";

const headerStyles = {
  position: "absoulute",
  top: 0,
  right: 0,
  left: 0,
  backgroundColor: "#0378d4",
  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
  height: "40px",
  color: "#ffffff",
  padding: "10px 25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

class StageView extends Component {
  _onDragEnd = data => {
    if (data) {
      this.props.moveTask({
        source: {
          stageId: data.source.droppableId,
          taskId: data.draggableId
        },
        destination: {
          stageId: data.destination.droppableId
        }
      });
    }
  };
  render() {
    const { showDialog, stages, removeTask } = this.props;

    return (
      <DragDropContext onDragEnd={this._onDragEnd}>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            height: "calc(100vh - 80px)"
          }}
        >
          {stages.map((stage, index) => (
            <div
              key={`${stage.order}-${index}`}
              style={{
                width: "100%",
                display: "flex",
                overflowY: "auto",
                flexDirection: "column",
                minWidth: "300px",
                borderRight: "solid #bdbdbd 2px"
              }}
            >
              <div style={headerStyles}>
                <h3>{stage.name}</h3>
                <span>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      showDialog({
                        type: actions.renameStage,
                        payload: { order: stage.order },
                        title: `Rename the ${stage.name} stage?`
                      })
                    }
                  >
                    [edit]
                  </a>
                  <span />
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      showDialog({
                        type: actions.removeStage,
                        payload: { order: stage.order },
                        title: `Are you sure you want to delete the ${
                          stage.name
                        } stage, and it's tasks?`
                      })
                    }
                  >
                    [delete]
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      showDialog({
                        type: actions.addTask,
                        payload: {
                          taskId: ++stage.tasks.length,
                          stageId: stage.order
                        },
                        title: `Add a new task to ${stage.name}`
                      })
                    }
                  >
                    [add task]
                  </a>
                </span>
              </div>

              <TaskList
                stageId={stage.order}
                tasks={stage.tasks}
                removeTask={removeTask}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    );
  }
}

export default StageView;
