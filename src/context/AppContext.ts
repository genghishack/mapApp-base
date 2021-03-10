import {createContext, useContext} from "react";

type AppContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  isEditor: boolean;
  isAdmin: boolean;
}

export const AppContext = createContext<AppContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isEditor: false,
  isAdmin: false,
})
AppContext.displayName = "AppContext";

export const useAppContext = () => useContext(AppContext);
