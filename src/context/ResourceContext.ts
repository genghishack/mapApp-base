import {createContext, useContext} from "react";

type ResourceContextType = {
  resourcePhaseTransition: Function;
  getMapMarkers: Function;
  selectedResource: any;
  setSelectedResource: Function;
  activeTab: string;
  setActiveTab: Function;
}

export const ResourceContext = createContext<ResourceContextType>({
  resourcePhaseTransition: () => {},
  getMapMarkers: () => {},
  selectedResource: {},
  setSelectedResource: () => {},
  activeTab: '',
  setActiveTab: () => {},
});
ResourceContext.displayName = 'ResourceContext';

export const useResourceContext = () => useContext(ResourceContext);
