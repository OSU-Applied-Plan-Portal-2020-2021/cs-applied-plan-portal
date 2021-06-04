import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin, loggedIn } from "./authService";

const RestrictedRoute = ({ children, ...rest }) => {
  // only show this route is user is admin and is logged in
  return (
    <Route
      {...rest}
      render={() => (isAdmin() ? children : <Redirect to="/login" />)}
    />
  );
};

export default RestrictedRoute;
