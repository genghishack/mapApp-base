import React, {useState} from 'react';
import {connect} from "react-redux";
import {Nav} from "react-bootstrap";

import {useAppContext} from "../../context/AppContext";
import {useResourceContext} from "../../context/ResourceContext";
import closeSVG from "../../assets/close_icon.png"
import CreateResource from "../CreateResource/CreateResource";
import ResourceInfo from "./ResourceInfo";

import "./InfoPanel.scss";

interface IInfoBoxProps {
  slide?: boolean;
  expanded?: boolean;
  setExpanded?: Function;
}

const InfoPanel = (props: IInfoBoxProps) => {
  const {slide, expanded, setExpanded} = props;
  const {isEditor, isAdmin} = useAppContext();
  const {activeTab, setActiveTab} = useResourceContext();

  const handleCloseClick = (e) => {
    if (setExpanded) {
      setExpanded(false);
    }
  };

  const expandedClass = expanded ? "expanded" : "";

  const renderTabs = () => (
    <>
      {/*@ts-ignore*/}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav.Item>
          <Nav.Link eventKey="info">Resource Info</Nav.Link>
        </Nav.Item>
        {isEditor || isAdmin ? (
          <Nav.Item>
            <Nav.Link eventKey="create">Create Resource</Nav.Link>
          </Nav.Item>
        ) : null}
      </Nav>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        if (isEditor || isAdmin) {
          return <CreateResource/>;
        } else {
          return <ResourceInfo/>;
        }
      case 'info':
      default:
        return <ResourceInfo/>;
    }
  }

  if (slide) {
    return (
      <div className={`InfoPanel slide ${expandedClass}`}>
        <img
          className="closeIcon"
          src={closeSVG}
          alt="close"
          onClick={handleCloseClick}
        />
        <div className="infoPanelTabs">
          {renderTabs()}
        </div>
        <div className="infoPanelContent">
          {renderContent()}
        </div>
      </div>
    )
  } else {
    return (
      <div className="InfoPanel">
        <div className="infoPanelTabs">
          {renderTabs()}
        </div>
        <div className="infoPanelContent">
          {renderContent()}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(InfoPanel);
