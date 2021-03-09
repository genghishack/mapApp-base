import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';

import {listRoles, listUsers} from "../../../libs/userLib";
import UserRow from "./UserRow";
import CreateUser from "./CreateUser";

const UserAdmin = () => {
  const [userList, setUserList] = useState([]);
  const [roles, setRoles] = useState([]);

  const getUserList = async () => {
    const users = await listUsers();
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

  return (
    <div className="UserAdmin">
      <header>User admin</header>
      <CreateUser getUserList={getUserList}/>
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
