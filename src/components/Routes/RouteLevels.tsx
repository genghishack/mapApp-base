import React from 'react';
import {Route, Redirect, useLocation} from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

function querystring(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export const GuestRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAppContext();
  const redirect = querystring("redirect");
  return (
    <Route {...rest}>
      {!isAuthenticated ? (
        children
      ) : (
        <Redirect to={redirect === "" || redirect === null ? "/" : redirect} />
      )}
    </Route>
  );
}

export const UserRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated ? (
        children
      ) : (
        <Redirect to={
          `/auth?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}

export const EditorRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated, isEditor, isAdmin } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated && (isEditor || isAdmin) ? (
        children
      ) : (
        <Redirect to={
          `/auth?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}

export const AdminRoute = ({ children, ...rest }) => {
  const { pathname, search } = useLocation();
  const { isAuthenticated, isAdmin } = useAppContext();
  return (
    <Route {...rest}>
      {isAuthenticated && (isAdmin) ? (
        children
      ) : (
        <Redirect to={
          `/auth?redirect=${pathname}${search}`
        } />
      )}
    </Route>
  );
}
