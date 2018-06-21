import React from "react";
import deepMerge from "deepmerge";
import { Field, reduxForm } from "redux-form";

import { addTeamMember } from "../../redux/actions/team/teamActions";

import {
  PrimaryButton,
  DefaultButton,
  DialogFooter,
  TextField
} from "office-ui-fabric-react";

let AddTeamMemberForm = props => {
  const { handleSubmit, invalid, onCancel } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstname"
        component={({ input, meta, label }) => (
          <TextField label={"First Name"} required={true} {...input} />
        )}
        type="text"
      />
      <Field
        name="lastname"
        component={({ input, meta, label }) => (
          <TextField label={"Last Name"} required={true} {...input} />
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

AddTeamMemberForm = reduxForm({
  form: "AddTeamMember",
  onSubmit(values, dispatch) {
    dispatch(addTeamMember(values));
  },
  onSubmitSuccess(result, dispatch, { onCancel }) {
    onCancel();
  },
  validate(values) {
    const { firstname, lastname } = values;
    let errors = {};
    if (!firstname) {
      errors = deepMerge(errors, {
        firstName: "required field"
      });
    }
    if (!lastname) {
      errors = deepMerge(errors, {
        lastName: "required field"
      });
    }
    return errors;
  }
})(AddTeamMemberForm);

export default AddTeamMemberForm;
