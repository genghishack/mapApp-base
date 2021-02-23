import React from 'react';
import {useHistory, useLocation} from "react-router-dom";

interface INavItemProps {
  label: string;
  pathname?: string;
  callback?: Function;
}

const NavItem = (props: INavItemProps) => {
  const {label, pathname, callback} = props;
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    if (pathname) {
      return history.push(pathname);
    }
    if (callback) {
      callback()
    }
  }

  return (
    <div
      className={`NavItem ${location.pathname === pathname ? 'active' : 'inactive'}`}
      onClick={handleClick}
    >{label}</div>
  )
}

export default NavItem;
