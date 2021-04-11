import React from 'react';
import {connect} from 'react-redux';

import {useAppContext} from "../../context/AppContext";
import NavItem from './NavItem';

interface IMainNav {
  currentUser: any;
}

const MainNav = (props: IMainNav) => {
  const {currentUser} = props;
  const {isAuthenticated} = useAppContext();

  return (
    <div className="Nav">
      <NavItem label="Resource Map" pathname="/" />
      {isAuthenticated ? (
        <NavItem label="My Resources" pathname={`/${currentUser.id}`} />
      ) : null}
      <NavItem label="About" pathname="/about" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  }
}

export default connect(mapStateToProps)(MainNav);
