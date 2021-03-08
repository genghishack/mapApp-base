import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faPlusSquare, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Button, Form} from "react-bootstrap";

import {createUser, listRoles, listUsers} from "../../libs/userLib";
import {useFormFields} from "../../libs/hooksLib";
import UserRow from "./UserRow";

const UserAdmin = () => {
  const [userList, setUserList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: '',
  });

  const getUserList = async () => {
    const users = await listUsers()
    setUserList(users.data);
  }

  const getRoles = async () => {
    const cognitoRoles = await listRoles();
    setRoles(cognitoRoles.data);
  }

  useEffect(() => {
    getUserList().then();
    getRoles().then();
  }, [])

  const toggleCreateUser = (evt) => {
    setIsCreatingUser(!isCreatingUser);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setIsCreatingUser(false);
    await createUser({email: fields.email});
    await getUserList();
  }

  return (
    <div className="UserAdmin">
      <header>User admin</header>
      <div className="createUser inline">
        {isCreatingUser ? (
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
        ) : (
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
        )}
      </div>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Role(s)</th>
          <th>Status</th>
          <th>Enabled</th>
        </tr>
        </thead>
        <tbody>
        {userList.map((user: any) => (
          <UserRow
            key={user.id}
            initialUserData={user}
            getUserList={getUserList}
            roles={roles}
          />
        ))}
        </tbody>
      </Table>
    </div>
  )
}

export default UserAdmin;
