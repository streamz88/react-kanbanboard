import React, { Component } from "react";
import {
  DocumentCard,
  DocumentCardStatus,
  Link,
  Label
} from "office-ui-fabric-react";

class TaskCard extends Component {
  render() {
    const { task, action, stageId } = this.props;
    return (
      <DocumentCard width={300}>
        <div
          style={{
            padding: "0 20px"
          }}
        >
          <strong>#{task.id}</strong>
          <h2 style={{ margin: 0 }}>{task.title}</h2>
          <Label>{task.description}</Label>
        </div>
        <DocumentCardStatus
          status={
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center"
              }}
            >
              <Link
                onClick={() => {
                  action({ taskId: task.id, stageId: stageId });
                }}
              >
                [delete task]
              </Link>
            </div>
          }
        />
      </DocumentCard>
    );
  }
}

export default TaskCard;
