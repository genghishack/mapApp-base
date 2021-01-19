import React from 'react';
import { connect } from "react-redux";
import './MenuTree.scss';
var MenuTree = function (props) {
    var handleSelection = props.handleSelection, showMenuTree = props.showMenuTree;
    var showMenuTreeClass = showMenuTree ? "show" : "";
    return (React.createElement("div", { className: "menuTreeWrapper " + showMenuTreeClass },
        React.createElement("div", { className: "focus-on-usa", onClick: function () { return handleSelection(); } }, "Show Continental US"),
        React.createElement("div", null, "resource")));
};
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(MenuTree);
