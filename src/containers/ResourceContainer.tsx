import React, {useCallback, useEffect, useState} from 'react';
import {connect} from "react-redux";

import {getResources} from "../libs/resourceLib";
import {getCategories} from "../libs/categoryLib";
import {getStates} from "../libs/stateLib";
import {ResourceContext} from '../context/ResourceContext';
import {setResources} from "../redux/actions/resources";
import {setCategories} from "../redux/actions/categories";
import {setStates} from "../redux/actions/states";
import {setError} from "../redux/actions/errors";
import ResourceMap from "../components/ResourceMap/ResourceMap";
import InfoPanel from "../components/InfoPanel/InfoPanel";
import NavPanel from '../components/NavPanel/NavPanel';
import DeleteResourceModal from "../components/Modal/DeleteResourceModal";
import EditResourceModal from "../components/Modal/EditResourceModal";
import SubmitResourceModal from "../components/Modal/SubmitResourceModal";
import AddResourceModal from "../components/Modal/AddResourceModal";

import './Resource.scss';

interface IResourceContainer {
  dispatch: Function;
  match?: any;
}

const ResourceContainer = (props: IResourceContainer) => {
  const {dispatch, match} = props;

  const [displayedResource, setDisplayedResource] = useState({});
  const [selectedResource, setSelectedResource] = useState({});
  const [showDeleteResourceModal, setShowDeleteResourceModal] = useState(false);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showEditResourceModal, setShowEditResourceModal] = useState(false);
  const [showSubmitResourceModal, setShowSubmitResourceModal] = useState(false);
  const [infoPanelExpanded, setInfoPanelExpanded] = useState(true);

  let userId = null;
  if (match) {
    ({userId} = match.params);
  }
  const getResourceList = useCallback(async () => {
    let markers = {data: []};
    try {
      markers = await getResources(userId);
      dispatch(setResources(markers.data));
    } catch (e) {
      dispatch(setError(e));
    }
  }, [dispatch, userId]);

  const getCategoryList = useCallback(async () => {
    let categoryList = {data: []};
    try {
      categoryList = await getCategories();
      dispatch(setCategories(categoryList.data));
    } catch (e) {
      dispatch(setError(e));
    }
  }, [dispatch]);

  const getStateList = useCallback(async () => {
    let stateList = {data: []};
    try {
      stateList = await getStates();
      dispatch(setStates(stateList.data));
    } catch (e) {
      dispatch(setError(e));
    }
  }, []);

  //@ts-ignore
  useEffect(() => {
    getCategoryList().then();
    getResourceList().then();
    getStateList().then();
  }, [getCategoryList, getResourceList]);

  return (
    <div className="ResourceContainer">
      <ResourceContext.Provider value={{
        getMapMarkers: getResourceList,
        displayedResource, setDisplayedResource,
        selectedResource, setSelectedResource,
        showDeleteResourceModal, setShowDeleteResourceModal,
        showAddResourceModal, setShowAddResourceModal,
        showEditResourceModal, setShowEditResourceModal,
        showSubmitResourceModal, setShowSubmitResourceModal,
      }}>
        <NavPanel
          userId={userId}
        />
        <ResourceMap/>
        <InfoPanel
          slide={false}
          expanded={infoPanelExpanded}
          setExpanded={setInfoPanelExpanded}
        />
        <DeleteResourceModal/>
        <AddResourceModal/>
        <EditResourceModal/>
        <SubmitResourceModal/>
      </ResourceContext.Provider>
    </div>
  )
}

function mapStateToProps(state: { errors: any; }) {
  return {
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(ResourceContainer);
