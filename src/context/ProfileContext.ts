import {ChangeEventHandler, createContext, useContext} from "react";

export const ProfileContext = createContext<{
  isLoading: boolean;
  setIsLoading: Function;
  fields: any;
  handleFieldChange: ChangeEventHandler;
  profilePhaseTransition: Function;
}>({
  isLoading: false,
  setIsLoading: () => {},
  fields: [],
  handleFieldChange: () => {},
  profilePhaseTransition: () => {},
});
ProfileContext.displayName = 'ProfileContext';

export const useProfileContext = () => useContext(ProfileContext);
