import {ChangeEventHandler, createContext, useContext} from "react";

type AuthContextType = {
  isLoading: boolean;
  setIsLoading: Function;
  fields: any;
  handleFieldChange: ChangeEventHandler;
  newUser: any;
  attemptSignin: Function;
  authPhaseTransition: Function;
}

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  setIsLoading: () => {},
  fields: [],
  handleFieldChange: () => {},
  newUser: {},
  attemptSignin: () => {},
  authPhaseTransition: () => {},
});
AuthContext.displayName = "AuthContext";

export const useAuthContext = () => useContext(AuthContext);
