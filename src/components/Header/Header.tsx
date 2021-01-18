import React from 'react';

import './Header.scss';
import Nav from './Nav';

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
          <span className="light">Goobledysnart </span>
          <span className="normal">Blagglefarg</span>
        </div>

      </a>

      <Nav/>

      <div className="controls">
      </div>
    </header>
  )
}

export default Header;
