import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AccessDenied from "../pages/AccessDenied";

export default function PrivateRoute({ children, component, ...rest }) {
  const { user } = React.useContext(UserContext);
  if (component) {
    return (
      <Route
        {...rest}
        component={user.token ? component : AccessDenied}
      ></Route>
    );
  }
  return (
    <Route
      {...rest}
      render={() => {
        return user.token ? children : <Redirect to="/login"></Redirect>;
      }}
    ></Route>
  );
}
