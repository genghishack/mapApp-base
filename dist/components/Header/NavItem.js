import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
var NavItem = function (props) {
    var label = props.label, pathname = props.pathname;
    var history = useHistory();
    var location = useLocation();
    return (React.createElement("div", { className: "nav-item " + (location.pathname === pathname ? 'active' : 'inactive'), onClick: function () { history.push(pathname); } }, label));
};
export default NavItem;
