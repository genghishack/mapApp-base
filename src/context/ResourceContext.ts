import {createContext, useContext} from "react";

type ResourceContextType = {
  getMapMarkers: Function;
  displayedResource: any;
  setDisplayedResource: Function;
  selectedResource: any;
  setSelectedResource: Function;
  showDeleteResourceModal: boolean;
  setShowDeleteResourceModal: Function;
  showAddResourceModal: boolean;
  setShowAddResourceModal: Function;
  showEditResourceModal: boolean;
  setShowEditResourceModal: Function;
  showSubmitResourceModal: boolean;
  setShowSubmitResourceModal: Function;
}

export const ResourceContext = createContext<ResourceContextType>({
  getMapMarkers: () => {},
  displayedResource: {},
  setDisplayedResource: () => {},
  selectedResource: {},
  setSelectedResource: () => {},
  showDeleteResourceModal: false,
  setShowDeleteResourceModal: () => {},
  showAddResourceModal: false,
  setShowAddResourceModal: () => {},
  showEditResourceModal: false,
  setShowEditResourceModal: () => {},
  showSubmitResourceModal: false,
  setShowSubmitResourceModal: () => {},
});
ResourceContext.displayName = 'ResourceContext';

export const useResourceContext = () => useContext(ResourceContext);
