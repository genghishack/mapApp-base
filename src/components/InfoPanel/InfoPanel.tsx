import React from 'react';

import closeSVG from "../../assets/close_icon.png"
import ResourceInfo from "./ResourceInfo";

import "./InfoPanel.scss";

interface IInfoBoxProps {
  slide?: boolean;
  expanded?: boolean;
  setExpanded?: Function;
}

const InfoPanel = (props: IInfoBoxProps) => {
  const {slide, expanded, setExpanded} = props;

  const handleCloseClick = (e) => {
    if (setExpanded) {
      setExpanded(false);
    }
  };

  const expandedClass = expanded ? "expanded" : "";

  if (slide) {
    return (
      <div className={`InfoPanel slide ${expandedClass}`}>
        <img
          className="closeIcon"
          src={closeSVG}
          alt="close"
          onClick={handleCloseClick}
        />
        <div className="infoPanelContent">
          <ResourceInfo/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="InfoPanel">
        <div className="infoPanelContent">
          <ResourceInfo/>
        </div>
      </div>
    )
  }
};

export default InfoPanel;
