import React, {useState} from 'react';
import {useFormFields} from "../../../libs/hooksLib";
import {createUser} from "../../../libs/userLib";
import {Button, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faPlusSquare, faTimes} from "@fortawesome/free-solid-svg-icons";

interface ICreateUser {
  getUserList: Function;
}

const CreateUser = (props: ICreateUser) => {
  const {getUserList} = props;
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
  });

  const toggleCreateUser = (evt) => {
    setIsCreatingUser(!isCreatingUser);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsCreatingUser(false);
    await createUser({email: fields.email});
    await getUserList();
  }

  const renderCreateUserForm = () => {
    return (
      <>
        <Button
          variant="link"
          onClick={toggleCreateUser}
        ><FontAwesomeIcon
          icon={faTimes}
          className="failure"
        /></Button>
        <Form className="inline" onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              value={fields.email}
              onChange={handleFieldChange}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="link"
          ><FontAwesomeIcon
            icon={faCheckSquare}
            className="success"
          /></Button>
        </Form>
      </>
    )
  }

  const renderCreateUserButton = () => {
    return (
      <>
        <Button
          variant="link"
          onClick={toggleCreateUser}
        ><FontAwesomeIcon
          icon={faPlusSquare}
          className="info"
        /></Button>
        <div className="label">Create User</div>
      </>
    )
  }

  return (
    <div className="CreateUser inline">
      {isCreatingUser ? renderCreateUserForm() : renderCreateUserButton()}
    </div>
  );
}

export default CreateUser;
