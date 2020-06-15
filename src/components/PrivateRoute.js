import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AccessDenied from "../pages/AccessDenied";
import Navbar from "./Users/Navbar";
import Sidebar from "./Users/Sidebar";

export default function PrivateRoute({ children, component, ...rest }) {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      {component ? (
        <Route
          {...rest}
          component={user.token ? component : AccessDenied}
        ></Route>
      ) : (
        <Route
          {...rest}
          render={() => {
            return user.token ? children : <Redirect to="/login"></Redirect>;
          }}
        ></Route>
      )}
    </>
  );
}
