import React, { Component } from "react";

import { DefaultButton, List } from "office-ui-fabric-react";

class TeamMemberList extends Component {
  _onRenderPanelBody = (user, index) => {
    const { action } = this.props;
    return (
      <div
        key={user.id}
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0 10px 0"
        }}
      >
        <span>
          {user.firstname} {user.lastname}
        </span>
        <DefaultButton
          onClick={() =>
            action({ id: user.id, name: `${user.firstname} ${user.lastname}` })
          }
          text="Remove"
        />
      </div>
    );
  };
  render() {
    return (
      <List items={this.props.users} onRenderCell={this._onRenderPanelBody} />
    );
  }
}

export default TeamMemberList;
