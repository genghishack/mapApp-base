import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";

import {getResources} from "../libs/resourceLib";
import {ResourceContext} from '../context/ResourceContext';
import {setResources} from "../redux/actions/resources";
import {setError} from "../redux/actions/errors";
import ResourceMap from "../components/ResourceMap/ResourceMap";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import NavPanel from '../components/NavPanel/NavPanel';
import DeleteResourceModal from "../components/Modal/DeleteResourceModal";

import './Resource.scss';

interface IResourceContainer {
  dispatch: Function;
  resources?: any;
  match?: any;
}

const ResourceContainer = (props: IResourceContainer) => {
  const {dispatch, resources, match} = props;

  const [activeTab, setActiveTab] = useState('info');
  const [displayedResource, setDisplayedResource] = useState({});
  const [selectedResource, setSelectedResource] = useState({});
  const [showDeleteResourceModal, setShowDeleteResourceModal] = useState(false);
  const [infoPanelExpanded, setInfoPanelExpanded] = useState(true);

  let userId = null;
  if (match) {
    ({userId} = match.params);
  }
  const getMapMarkers = useCallback(async () => {
    let markers = {data: []};
    try {
      markers = await getResources(userId);
      dispatch(setResources(markers.data));
    } catch (e) {
      dispatch(setError(e));
    }
  }, [dispatch]);

  //@ts-ignore
  useEffect(() => {
    getMapMarkers().then();
  }, [getMapMarkers]);

  return (
    <div className="ResourceContainer">
      <ResourceContext.Provider value={{
        displayedResource, setDisplayedResource,
        selectedResource, setSelectedResource,
        showDeleteResourceModal, setShowDeleteResourceModal,
        activeTab, setActiveTab, getMapMarkers,
      }}>
        <NavPanel
          resources={resources}
        />
        <ResourceMap resources={resources}/>
        <InfoPanel
          slide={false}
          expanded={infoPanelExpanded}
          setExpanded={setInfoPanelExpanded}
          userId={userId}
        />
        <DeleteResourceModal
          show={showDeleteResourceModal}
          setShow={setShowDeleteResourceModal}
          resource={selectedResource}
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
