import React from 'react';

interface IUserRolesCell {
  user: any;
}

const UserRolesCell = (props: IUserRolesCell) => {
  const {user} = props;

  return (
    <>
      {user.roles.join(', ')}
    </>
  )
}

export default UserRolesCell;
