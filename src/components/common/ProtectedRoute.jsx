import React from "react";
import authService from "../../auth/authService";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props.location);
        if (!authService.getCurrentUser())
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;
