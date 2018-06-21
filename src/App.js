import React, { Component } from "react";
import { connect } from "react-redux";
import { removeTeamMember } from "./redux/actions/team/teamActions";
import { removeTask, moveTask } from "./redux/actions/stages/stagesActions";

import AddTeamMemberForm from "./components/forms/addTeamMemberForm";
import RenameStageForm from "./components/forms/renameStageForm";
import RemoveStageConfirm from "./components/forms/removeStageComfirm";
import RemoveTeamMemberConfirm from "./components/forms/removeTeamMemberConfirm";
import AddStageForm from "./components/forms/addStageForm";
import AddTaskForm from "./components/forms/addTaskForm";
import StageView from "./components/StageView";
import { actions } from "./redux/constants";

import {
  Fabric,
  CommandBar,
  Panel,
  PanelType,
  PrimaryButton,
  Dialog,
  DialogType
} from "office-ui-fabric-react";

import "./App.scss";

import TeamMemberList from "./components/teamMemberList";

class App extends Component {
  state = {
    showPanel: false,
    hideDialog: true,
    currentAction: { type: null }
  };
  _showDialog = data => {
    this.setState({ hideDialog: false, currentAction: data });
  };

  _closeDialog = () => {
    this.setState({ hideDialog: true });
  };

  _onClosePanel = () => {
    this.setState({ showPanel: false });
  };

  _onRenderFooterContent = () => {
    return (
      <div>
        <PrimaryButton
          onClick={this._onClosePanel}
          style={{ marginRight: "8px" }}
        >
          Back
        </PrimaryButton>
      </div>
    );
  };

  _onShowPanel = () => {
    this.setState({ showPanel: true });
  };

  render() {
    const { currentAction, hideDialog, showPanel } = this.state;
    const { stages, team, removeTask, moveTask } = this.props;
    const farMenuItems = [
      {
        key: "member-list",
        name: (
          <span>
            You have{" "}
            <strong style={{ color: "#0378d4" }}>{team.users.length}</strong>{" "}
            {team.name}{" "}
          </span>
        ),
        onClick: () => this._onShowPanel()
      },
      {
        key: "add-stage",
        name: <span>Add Stage</span>,
        onClick: () =>
          this._showDialog({ type: actions.addStage, title: "Add a new stage" })
      },
      {
        key: "add-member",
        name: "Add team member",
        onClick: () =>
          this._showDialog({
            type: actions.addTeamMember,
            title: "Add a new team member"
          })
      }
    ];
    const items = [
      {
        key: "logo",
        name: <h2> Charter Match</h2>,
        onClick: () => false
      }
    ];
    return (
      <div
        style={{
          height: "100vh",
          width: "100wh",
          overflow: "hidden",
          background: "#dedede"
        }}
      >
        <Fabric>
          <CommandBar items={items} farItems={farMenuItems} />
          {showPanel && (
            <Panel
              isOpen={showPanel}
              type={PanelType.smallFixedFar}
              onDismiss={this._onClosePanel}
              headerText={team.name}
              onRenderFooterContent={this._onRenderFooterContent}
            >
              <TeamMemberList
                users={team.users}
                action={payload => {
                  this._showDialog({
                    type: actions.removeTeamMember,
                    payload: payload,
                    title: `Are you sure you can to delete ${payload.name} ?`
                  });
                }}
              />
            </Panel>
          )}
          {!hideDialog && (
            <Dialog
              hidden={hideDialog}
              onDismiss={this._closeDialog}
              dialogContentProps={{
                type: DialogType.largeHeader,
                title: currentAction.title
              }}
              modalProps={{
                titleAriaId: "myLabelId",
                subtitleAriaId: "mySubTextId",
                isBlocking: false,
                containerClassName: "ms-dialogMainOverride"
              }}
            >
              {currentAction.type === actions.addTeamMember && (
                <AddTeamMemberForm onCancel={this._closeDialog} />
              )}
              {currentAction.type === actions.removeTeamMember && (
                <RemoveTeamMemberConfirm
                  onCancel={this._closeDialog}
                  payload={currentAction.payload}
                />
              )}
              {currentAction.type === actions.addStage && (
                <AddStageForm onCancel={this._closeDialog} />
              )}
              {currentAction.type === actions.renameStage && (
                <RenameStageForm
                  onCancel={this._closeDialog}
                  stageId={currentAction.payload}
                />
              )}
              {currentAction.type === actions.removeStage && (
                <RemoveStageConfirm
                  onCancel={this._closeDialog}
                  stageId={currentAction.payload}
                />
              )}
              {currentAction.type === actions.addTask && (
                <AddTaskForm
                  onCancel={this._closeDialog}
                  id={currentAction.payload.taskId}
                  stageId={currentAction.payload.stageId}
                />
              )}
            </Dialog>
          )}
          <StageView
            stages={stages}
            showDialog={this._showDialog}
            removeTask={removeTask}
            moveTask={moveTask}
          />
        </Fabric>
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => ({
  removeFromTeam(index) {
    dispatch(removeTeamMember(index));
  },
  removeTask(index) {
    dispatch(removeTask(index));
  },
  moveTask(task) {
    dispatch(moveTask(task));
  }
});

export const Unwrapped = App;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
