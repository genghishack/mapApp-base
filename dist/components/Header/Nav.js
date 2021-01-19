import React from 'react';
import NavItem from './NavItem';
var Nav = function () {
    return (React.createElement("div", { className: "Nav" },
        React.createElement(NavItem, { label: "Resources", pathname: "/" }),
        React.createElement(NavItem, { label: "About", pathname: "/about" })));
};
export default Nav;
