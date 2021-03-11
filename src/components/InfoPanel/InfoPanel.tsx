import React, {useState} from 'react';
import { connect } from "react-redux";
import {Nav} from "react-bootstrap";

import {useAppContext} from "../../context/AppContext";
import closeSVG from "../../assets/close_icon.png"
import CreateResource from "../CreateResource/CreateResource";

import "./InfoPanel.scss";

interface IInfoBoxProps {
  resource: any;
  slide?: boolean;
  expanded?: boolean;
  setExpanded?: Function;
}

const InfoPanel = (props: IInfoBoxProps) => {
  const { resource, slide, expanded, setExpanded } = props;
  const [activeTab, setActiveTab] = useState('info');
  const {isEditor, isAdmin} = useAppContext();

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

  const renderTabs = () => (
    <>
      {/*@ts-ignore*/}
      <Nav variant="tabs" defaultActiveKey={activeTab} onSelect={(k) => setActiveTab(k)}>
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
          return renderResourceInfo();
        }
      case 'info':
      default:
        return renderResourceInfo();
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
        <div className="infoPanelContent">
          {renderTabs()}
          {renderContent()}
        </div>
      </div>
    )
  } else {
    return (
      <div className="InfoPanel">
        <div className="infoPanelContent">
          {renderTabs()}
          {renderContent()}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(InfoPanel);
