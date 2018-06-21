import React from "react";
import deepMerge from "deepmerge";
import { Field, reduxForm } from "redux-form";

import { renameStage } from "../../redux/actions/stages/stagesActions";

import {
  PrimaryButton,
  DefaultButton,
  DialogFooter,
  TextField
} from "office-ui-fabric-react";

let RenameStage = props => {
  const { handleSubmit, invalid, onCancel } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component={({ input, meta, label }) => (
          <TextField label={"Stage Name"} required={true} {...input} />
        )}
        type="text"
      />

      <DialogFooter>
        <PrimaryButton type="submit" text="Save" disabled={invalid} />
        <DefaultButton onClick={onCancel} text="Cancel" />
      </DialogFooter>
    </form>
  );
};

RenameStage = reduxForm({
  form: "RenameStage",
  onSubmit(values, dispatch, props) {
    dispatch(renameStage({ ...values, ...props.stageId }));
  },
  onSubmitSuccess(result, dispatch, { onCancel }) {
    onCancel();
  },
  validate(values) {
    const { name } = values;
    let errors = {};
    if (!name) {
      errors = deepMerge(errors, {
        firstName: "required field"
      });
    }

    return errors;
  }
})(RenameStage);

export default RenameStage;
