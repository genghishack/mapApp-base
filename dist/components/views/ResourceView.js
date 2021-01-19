import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ResourceMap from '../ResourceMap/ResourceMap';
import Config from '../../config';
import MenuTree from '../MenuTree/MenuTree';
import InfoBox from '../InfoBox/InfoBox';
import './ResourceView.scss';
var apiConfig = Config.apiGateway;
var ResourceView = function (props) {
    var dispatch = props.dispatch;
    var _a = useState(false), infoTrayExpanded = _a[0], setInfoTrayExpanded = _a[1];
    var _b = useState({}), resource = _b[0], setResource = _b[1];
    var _c = useState(''), selectedResource = _c[0], setSelectedResource = _c[1];
    useLayoutEffect(function () {
    }, [dispatch]);
    var handleResourceSelection = function (stateAbbr, districtNum) {
        if (districtNum === void 0) { districtNum = ''; }
        setSelectedResource(districtNum);
    };
    return (React.createElement("div", { className: "ResourceView" },
        React.createElement(Header, null),
        React.createElement("div", { id: "main-container" },
            React.createElement(MenuTree, { handleSelection: handleResourceSelection }),
            React.createElement(ResourceMap, { selectedResource: selectedResource, setResource: setResource, setInfoTrayExpanded: setInfoTrayExpanded }),
            React.createElement(InfoBox, { resource: resource }))));
};
function mapStateToProps(state) {
    return {
        errors: state.errors,
    };
}
export default connect(mapStateToProps)(ResourceView);
