import React from 'react';

import './Header.scss';
import Nav from '../Navigation/Nav';
import AuthNav from '../Navigation/AuthNav';

interface IHeaderProps {
}

const Header = (props: IHeaderProps) => {

  return (
    <header id="Header">
      <a href="/" className="home-link">

        <div className="main-logo">
          <i className="fas fa-globe"></i>
        </div>

        <div className="main-title">
          <span className="light">MapApp </span>
          <span className="normal">Base</span>
        </div>

      </a>

      <Nav/>

      <div className="controls">
      </div>

      <AuthNav/>
    </header>
  )
}

export default Header;
