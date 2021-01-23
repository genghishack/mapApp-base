import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ResourceMap from '../ResourceMap/ResourceMap';
import Config from '../../config';

import MenuTree from '../MenuTree/MenuTree';
import InfoBox from '../InfoBox/InfoBox';

import './ResourceView.scss';

interface IResourceViewProps {
  dispatch: Function;
}

const apiConfig = Config.apiGateway;

const ResourceView = (props: IResourceViewProps) => {
  const { dispatch } = props;

  const [infoTrayExpanded, setInfoTrayExpanded] = useState(false);
  const [resource, setResource] = useState({});
  const [selectedResource, setSelectedResource] = useState('');

  useLayoutEffect(() => {
  }, [dispatch]);

  const handleResourceSelection = (stateAbbr: string, resourceId: string = '') => {
    setSelectedResource(resourceId);
  };

  return (
    <div className="ResourceView">
      <Header/>
      <div id="main-container">
        <MenuTree
          handleSelection={handleResourceSelection}
        />
        <ResourceMap
          selectedResource={selectedResource}
          setResource={setResource}
          setInfoTrayExpanded={setInfoTrayExpanded}
        />
        <InfoBox
          resource={resource}
          /* Comment this line with // to use Infobox as a slider tray
          slide={true}
          expanded={infoTrayExpanded}
          setExpanded={setInfoTrayExpanded}
          //*/
        />
      </div>
    </div>
  )
}

function mapStateToProps(state: { errors: any; }) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(ResourceView);
