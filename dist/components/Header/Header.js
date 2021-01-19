import React from 'react';
import './Header.scss';
import Nav from './Nav';
var Header = function (props) {
    return (React.createElement("header", { id: "Header" },
        React.createElement("a", { href: "/", className: "home-link" },
            React.createElement("div", { className: "main-logo" },
                React.createElement("i", { className: "fas fa-globe" })),
            React.createElement("div", { className: "main-title" },
                React.createElement("span", { className: "light" }, "MapApp "),
                React.createElement("span", { className: "normal" }, "Base"))),
        React.createElement(Nav, null),
        React.createElement("div", { className: "controls" })));
};
export default Header;
