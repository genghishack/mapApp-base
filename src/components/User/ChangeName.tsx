import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import LoaderButton from "../LoaderButton";
import { useFormFields } from "../../libs/hooksLib";
import { onError } from "../../libs/errorLib";
import {getUser} from '../../libs/userLib';
import {setCurrentUser} from "../../redux/actions/currentUser";

import "./ChangeName.scss";
import {connect} from "react-redux";

interface IChangeNameProps {
  dispatch: Function;
}

const ChangeName = (props: IChangeNameProps) => {
  const {dispatch} = props;

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
      const updatedUser = await getUser();
      dispatch(setCurrentUser(updatedUser.data))
      history.push("/profile");
    } catch (error) {
      onError(error);
    }
  }

  function renderUpdateForm() {
    return (
      <Form onSubmit={handleUpdateClick}>
        {/*@ts-ignore*/}
        <Form.Group size="lg" controlId="name">
          <Form.Text>Name</Form.Text>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isSendingCode}
          disabled={!validateNameForm()}
        >
          Update Name
        </LoaderButton>
      </Form>
    );
  }

  return (
    <div className="ChangeName">
      {renderUpdateForm()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(ChangeName);
