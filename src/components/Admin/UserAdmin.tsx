import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';

import {listUsers} from "../../libs/userLib";
import UserRow from "./UserRow";

const UserAdmin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      const users = await listUsers()
      setUserList(users.data);
    }
    getUserList();
  }, [])

  return (
    <div className="UserAdmin">
      <header>User admin</header>
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
        {userList.map((user: any) => <UserRow initialUserData={user}/>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserAdmin;
