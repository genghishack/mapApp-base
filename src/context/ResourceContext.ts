import {createContext, useContext} from "react";

type ResourceContextType = {
  resourcePhaseTransition: Function;
  getMapMarkers: Function;
}

export const ResourceContext = createContext<ResourceContextType>({
  resourcePhaseTransition: () => {},
  getMapMarkers: () => {},
});
ResourceContext.displayName = 'ResourceContext';

export const useResourceContext = () => useContext(ResourceContext);
