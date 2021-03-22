import {createContext, useContext} from "react";

type AdminContextType = {
  adminPhaseTransition: Function;
}

export const AdminContext = createContext<AdminContextType>({
  adminPhaseTransition: () => {}
});
AdminContext.displayName = "AdminContext";

export const useAdminContext = () => useContext(AdminContext);
