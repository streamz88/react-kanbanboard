import React from "react";
import { reduxForm } from "redux-form";

import { removeStage } from "../../redux/actions/stages/stagesActions";

import {
  PrimaryButton,
  DefaultButton,
  DialogFooter
} from "office-ui-fabric-react";

let RemoveStageConfirm = props => {
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

RemoveStageConfirm = reduxForm({
  form: "RemoveStage",
  onSubmit(values, dispatch, props) {
    dispatch(removeStage({ ...props.stageId }));
  },
  onSubmitSuccess(result, dispatch, { onCancel }) {
    onCancel();
  }
})(RemoveStageConfirm);

export default RemoveStageConfirm;
