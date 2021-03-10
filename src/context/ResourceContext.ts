import {createContext, useContext} from "react";

type ResourceContextType = {
  resourcePhaseTransition: Function;
}

export const ResourceContext = createContext<ResourceContextType>({
  resourcePhaseTransition: () => {}
});
ResourceContext.displayName = 'ResourceContext';

export const useResourceContext = () => useContext(ResourceContext);
