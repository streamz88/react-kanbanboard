import React from "react";
import { reduxForm } from "redux-form";

import { removeTeamMember } from "../../redux/actions/team/teamActions";

import {
  PrimaryButton,
  DefaultButton,
  DialogFooter
} from "office-ui-fabric-react";

let RemoveTeamMemberConfirm = props => {
  const { handleSubmit, invalid, onCancel } = props;
  return (
    <form onSubmit={handleSubmit}>
      <DialogFooter>
        <PrimaryButton type="submit" text="Delete" disabled={invalid} />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </form>
  );
};

RemoveTeamMemberConfirm = reduxForm({
  form: "RemoveTeamMemberConfirm",
  onSubmit(values, dispatch, { payload }) {
    dispatch(removeTeamMember(payload));
  },
  onSubmitSuccess(result, dispatch, { onCancel }) {
    onCancel();
  }
})(RemoveTeamMemberConfirm);

export default RemoveTeamMemberConfirm;
