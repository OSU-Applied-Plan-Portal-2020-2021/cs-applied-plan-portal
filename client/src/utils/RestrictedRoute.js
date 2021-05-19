import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isHeadAdvisor, loggedIn } from "./authService";

const RestrictedRoute = ({ children, ...rest }) => {
  // only show this route is user is head advisor and is logged in
  return (
    <Route
      {...rest}
      render={() => (isHeadAdvisor() ? children : <Redirect to="/login" />)}
    />
  );
};

export default RestrictedRoute;
