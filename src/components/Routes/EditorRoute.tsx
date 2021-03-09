import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useAppContext } from "../../libs/contextLib";

export default function EditorRoute({ children, ...rest }) {
  const { pathname, search } = useLocation();
  //@ts-ignore
  const { isAuthenticated, isEditor, isAdmin } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated && (isEditor || isAdmin) ? (
        children
      ) : (
        <Redirect to={
          `/login?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}
