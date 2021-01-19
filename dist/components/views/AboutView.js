import React from 'react';
import Header from '../Header/Header';
import About from '../About/About';
var AboutView = function () {
    return (React.createElement("div", { className: "AboutView" },
        React.createElement(Header, null),
        React.createElement(About, null)));
};
export default AboutView;
