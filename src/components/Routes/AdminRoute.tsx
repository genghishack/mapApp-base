import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";

export default function AdminRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  //@ts-ignore
  const { isAuthenticated, isAdmin } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated && (isAdmin) ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}
