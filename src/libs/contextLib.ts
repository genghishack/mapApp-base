import { useContext, createContext } from 'react';

export const AppContext = createContext<{
  isAuthenticated: boolean;
  setIsAuthenticated: Function;
  isEditor: boolean;
  isAdmin: boolean;
}>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  isEditor: false,
  isAdmin: false,
});
AppContext.displayName = "AppContext";

export const AuthContext = createContext(null);
export const ProfileContext = createContext(null);
export const AdminContext = createContext(null);
export const ResourceContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);
export const useProfileContext = () => useContext(ProfileContext);
export const useAdminContext = () => useContext(AdminContext);
export const useResourceContext = () => useContext(ResourceContext);
