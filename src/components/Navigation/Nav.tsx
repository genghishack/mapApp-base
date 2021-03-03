import React from 'react';
import {connect} from "react-redux";
import NavItem from './NavItem';

interface INav {
  currentUser: any;
}

const Nav = (props: INav) => {
  const {currentUser} = props;

  return (
    <div className="Nav">
      <NavItem label="Resources" pathname="/" />
      {currentUser.roles && (currentUser.roles.includes('Admin') || currentUser.roles.includes('Editor'))
        ? <NavItem label="Create Resource" pathname="/create-resource" /> : null }
      {currentUser.roles && currentUser.roles.includes('Admin')
        ? <NavItem label="Admin Tools" pathname="/admin" /> : null }
      <NavItem label="About" pathname="/about" />
    </div>
  )
}

const mapStateToProps = (state: { errors: any; currentUser: any }) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(Nav);
