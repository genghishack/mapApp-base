import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";

import {getResources} from "../libs/resourceLib";
import {ResourceContext} from '../context/ResourceContext';
import {setResources} from "../redux/actions/resources";
import {setError} from "../redux/actions/errors";
import MenuTree from "../components/MenuTree/MenuTree";
import ResourceMap from "../components/ResourceMap/ResourceMap";
import InfoPanel from "../components/InfoPanel/InfoPanel";

import './Resource.scss';

interface IResourceContainer {
  dispatch: Function;
  resources?: any;
}

const ResourceContainer = (props: IResourceContainer) => {
  const {dispatch, resources} = props;

  const [resourcePhase, setResourcePhase] = useState('info');
  const [selectedResource, setSelectedResource] = useState({});
  // const [infoPanelExpanded, setInfoPanelExpanded] = useState(false);

  const getMapMarkers = useCallback(async () => {
    let markers = {data: []};
    try {
      markers = await getResources();
      dispatch(setResources(markers.data));
    } catch (e) {
      dispatch(setError(e));
    }
  }, [dispatch]);

  //@ts-ignore
  useEffect(() => {
    getMapMarkers().then();
  }, [getMapMarkers]);

  const resourcePhaseTransition = (phase) => {
    setResourcePhase(phase);
  }

  const handleResourceSelection = () => {
    //no-op
  };

  return (
    <div className="ResourceContainer">
      <ResourceContext.Provider value={{
        resourcePhaseTransition, getMapMarkers,
      }}>
        <MenuTree
          handleSelection={handleResourceSelection}
        />
        <ResourceMap resources={resources}/>
        <InfoPanel
          resource={selectedResource}
          // slide={true}
          // expanded={infoPanelExpanded}
          // setExpanded={setInfoPanelExpanded}
        />
      </ResourceContext.Provider>
    </div>
  )
}

function mapStateToProps(state: { errors: any; resources: any; }) {
  return {
    resources: state.resources,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(ResourceContainer);
