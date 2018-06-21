import React from "react";

import TaskCard from "./TaskCard";

import { Draggable, Droppable } from "react-beautiful-dnd";

export class TaskList extends React.Component {
  render() {
    const { tasks, removeTask, stageId } = this.props;

    return (
      <Droppable index={stageId} droppableId={`${stageId}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              padding: "0 25px",
              height: "calc(80px - 100vh)",
              borderRight: "solid #bdbdbd 2px"
            }}
          >
            {tasks &&
              tasks.map((task, index) => (
                <Draggable
                  key={`${stageId}-${task.id}-${index}`}
                  draggableId={task.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TaskCard
                        taskId={`${index}`}
                        action={removeTask}
                        stageId={stageId}
                        task={task}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}

export default TaskList;
