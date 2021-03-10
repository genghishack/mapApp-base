import {createContext, useContext} from "react";

export const ResourceContext = createContext(null);

export const useResourceContext = () => useContext(ResourceContext);
