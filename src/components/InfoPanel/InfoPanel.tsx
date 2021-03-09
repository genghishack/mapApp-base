import React from 'react';

import "./InfoPanel.scss";

import closeSVG from "../../assets/close_icon.png"
import { connect } from "react-redux";

interface IInfoBoxProps {
  resource: any;
  slide?: boolean;
  expanded?: boolean;
  setExpanded?: Function;
}

const InfoPanel = (props: IInfoBoxProps) => {
  const { resource, slide, expanded, setExpanded } = props;

  const handleCloseClick = (e) => {
    if (setExpanded) {
      setExpanded(false);
    }
  };

  const expandedClass = expanded ? "expanded" : "";

  const renderResourceInfo = () => {
    if (resource.properties) {
    } else {
      return (
        <div className="no-info">
          Resource Information
        </div>
      );
    }
  };

  const renderContent = () => (
    <div className="infoBoxContent">
      {renderResourceInfo()}
    </div>
  );

  if (slide) {
    return (
      <div className={`InfoPanel slide ${expandedClass}`}>
        <img
          className="closeIcon"
          src={closeSVG}
          alt="close"
          onClick={handleCloseClick}
        />
        {renderContent()}
      </div>
    )
  } else {
    return (
      <div className="InfoPanel">
        {renderContent()}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(InfoPanel);
