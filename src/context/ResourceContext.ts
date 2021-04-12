import {createContext, useContext} from "react";

type ResourceContextType = {
  getMapMarkers: Function;
  displayedResource: any;
  setDisplayedResource: Function;
  selectedResource: any;
  setSelectedResource: Function;
  showDeleteResourceModal: boolean;
  setShowDeleteResourceModal: Function;
  activeTab: string;
  setActiveTab: Function;
}

export const ResourceContext = createContext<ResourceContextType>({
  getMapMarkers: () => {},
  displayedResource: {},
  setDisplayedResource: () => {},
  selectedResource: {},
  setSelectedResource: () => {},
  showDeleteResourceModal: false,
  setShowDeleteResourceModal: () => {},
  activeTab: '',
  setActiveTab: () => {},
});
ResourceContext.displayName = 'ResourceContext';

export const useResourceContext = () => useContext(ResourceContext);
