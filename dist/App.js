import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CongressView from './components/views/ResourceView';
import AboutView from './components/views/AboutView';
import './App.scss';
var App = function (props) {
    return (React.createElement("div", { className: "App" },
        React.createElement(Router, null,
            React.createElement(Switch, null,
                React.createElement(Route, { path: "/about", component: AboutView }),
                React.createElement(Route, { path: "/", component: CongressView })))));
};
export default App;
