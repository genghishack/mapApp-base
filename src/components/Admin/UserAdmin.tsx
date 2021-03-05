import React, {useEffect, useState} from 'react';
import {API} from "aws-amplify";

import {listUsers} from "../../libs/userLib";

const UserAdmin = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUserList = async () => {
      const users = await listUsers()
      setUserList(users);
    }
    getUserList();
  }, [])

  return (
    <div className="UserAdmin">
      <header>User admin</header>
    </div>
  )
}

export default UserAdmin;
