import {createContext, useContext} from "react";

type ResourceContextType = {
  resourcePhaseTransition: Function;
  getMapMarkers: Function;
  selectedResource: any;
  setSelectedResource: Function;
}

export const ResourceContext = createContext<ResourceContextType>({
  resourcePhaseTransition: () => {},
  getMapMarkers: () => {},
  selectedResource: {},
  setSelectedResource: () => {},
});
ResourceContext.displayName = 'ResourceContext';

export const useResourceContext = () => useContext(ResourceContext);
