import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";
import {API} from "aws-amplify";

import {ResourceContext} from '../context/ResourceContext';
import {setResources} from "../redux/actions/resources";
import {setError} from "../redux/actions/errors";
import MenuTree from "../components/MenuTree/MenuTree";
import ResourceMap from "../components/ResourceMap/ResourceMap";
import InfoPanel from "../components/InfoPanel/InfoPanel";

import './Resource.scss';

interface IResourceContainer {
  dispatch: Function;
}

const ResourceContainer = (props: IResourceContainer) => {
  const {dispatch} = props;

  const [resourcePhase, setResourcePhase] = useState('info');
  const [selectedResource, setSelectedResource] = useState({});
  // const [infoPanelExpanded, setInfoPanelExpanded] = useState(false);

  const getMapMarkers = useCallback(async () => {
    let resources = {data: []};
    try {
      resources = await API.get('mapapp', '/resource', {});
      dispatch(setResources(resources.data));
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
        resourcePhaseTransition,
      }}>
        <MenuTree
          handleSelection={handleResourceSelection}
        />
        <ResourceMap />
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
