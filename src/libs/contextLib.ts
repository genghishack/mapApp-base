import { useContext, createContext } from 'react';

export const AppContext = createContext(null);
export const AuthContext = createContext(null);
export const ProfileContext = createContext(null);
export const AdminContext = createContext(null);

export const useAppContext = () => useContext(AppContext);
export const useAuthContext = () => useContext(AuthContext);
export const useProfileContext = () => useContext(ProfileContext);
export const useAdminContext = () => useContext(AdminContext);
