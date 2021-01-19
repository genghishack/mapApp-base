import React from 'react';
import "./InfoBox.scss";
import closeSVG from "../../assets/close_icon.png";
import { connect } from "react-redux";
var InfoBox = function (props) {
    var resource = props.resource, slide = props.slide, expanded = props.expanded, setExpanded = props.setExpanded;
    var handleCloseClick = function (e) {
        if (setExpanded) {
            setExpanded(false);
        }
    };
    var expandedClass = expanded ? "expanded" : "";
    var renderCongressInfo = function () {
        if (resource.properties) {
        }
        else {
            return (React.createElement("div", { className: "no-info" }, "Resources"));
        }
    };
    var renderContent = function () { return (React.createElement("div", { className: "content" }, renderCongressInfo())); };
    if (slide) {
        return (React.createElement("div", { className: "InfoBox slide " + expandedClass },
            React.createElement("img", { className: "closeIcon", src: closeSVG, alt: "close", onClick: handleCloseClick }),
            renderContent()));
    }
    else {
        return (React.createElement("div", { className: "InfoBox" }, renderContent()));
    }
};
function mapStateToProps(state) {
    return {};
}
export default connect(mapStateToProps)(InfoBox);
