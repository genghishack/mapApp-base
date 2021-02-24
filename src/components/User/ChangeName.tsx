import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import {
  FormText, // was HelpBlock in previous version of react-bootstrap
  FormGroup,
  FormControl,
  FormLabel, // was ControlLabel in previous version of react-bootstrap
} from "react-bootstrap";
import LoaderButton from "../LoaderButton";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import "./ChangeName.scss";

export default function ChangeName() {
  const history = useHistory();
  const [fields, handleFieldChange] = useFormFields({
    code: "",
    name: "",
  });
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateNameForm() {
    return fields.name.length > 0;
  }

  async function handleUpdateClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { name: fields.name });
      history.push("/profile");
    } catch (error) {
      onError(error);
    }
  }

  function renderUpdateForm() {
    return (
      <form onSubmit={handleUpdateClick}>
        {/*@ts-ignore*/}
        <FormGroup size="lg" controlId="name">
          <FormText>Name</FormText>
          <FormControl
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isSendingCode}
          disabled={!validateNameForm()}
        >
          Update Name
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="ChangeName">
      {renderUpdateForm()}
    </div>
  );
}
