import React from "react";
import deepMerge from "deepmerge";
import { Field, reduxForm } from "redux-form";

import { addTask } from "../../redux/actions/stages/stagesActions";

import {
  PrimaryButton,
  DefaultButton,
  DialogFooter,
  TextField,
  Label
} from "office-ui-fabric-react";

let AddTaskForm = props => {
  const { handleSubmit, invalid, onCancel } = props;

  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="title"
        component={({ input, meta: { error }, label }) => {
          return (
            <div>
              <TextField label={"Title"} required={true} {...input} />
              {error && <Label>error</Label>}
            </div>
          );
        }}
        type="text"
      />
      <Field
        name="description"
        component={({ input, meta, label }) => (
          <TextField label={"Description"} required={true} {...input} />
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

AddTaskForm = reduxForm({
  form: "AddTask",
  onSubmit(values, dispatch, { stageId }) {
    dispatch(
      addTask({
        ...values,
        stageId
      })
    );
  },
  onSubmitSuccess(result, dispatch, { onCancel }) {
    onCancel();
  },
  validate(values) {
    const { title, description } = values;
    let errors = {};
    if (!title) {
      errors = deepMerge(errors, {
        firstName: "required field"
      });
    }
    if (!description) {
      errors = deepMerge(errors, {
        lastName: "required field"
      });
    }
    return errors;
  }
})(AddTaskForm);

export default AddTaskForm;
