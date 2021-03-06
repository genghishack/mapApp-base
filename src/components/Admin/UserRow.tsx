import React, { useState } from 'react';

import UserEnabledCell from "./UserEnabledCell";
import UserEmailCell from "./UserEmailCell";
import UserRolesCell from "./UserRolesCell";

interface IUserRow {
  initialUserData: any;
  getUserList: Function;
  roles: string[];
}

const UserRow = (props: IUserRow) => {
  const {initialUserData, getUserList, roles} = props;
  const [user, setUser] = useState(initialUserData);

  return (
    <tr className="UserRow">
      <td>
        <UserEmailCell user={user}/>
      </td>
      <td>{user.name}</td>
      <td>
        <UserRolesCell
          user={user}
          setUser={setUser}
          roles={roles}
        />
      </td>
      <td>{user.status}</td>
      <td>
        <UserEnabledCell
          user={user}
          setUser={setUser}
          getUserList={getUserList}
        />
      </td>
    </tr>
  )
}

export default UserRow;
