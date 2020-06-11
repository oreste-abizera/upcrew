import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import AccessDenied from "../pages/AccessDenied";
import Navbar from "./Users/Navbar";
import Sidebar from "./Users/Sidebar";

export default function TeacherRoute({ children, component, ...rest }) {
  const { user } = React.useContext(UserContext);
  return (
    <>
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      {component ? (
        <Route
          {...rest}
          component={
            user.token && user.user.type === "teacher"
              ? component
              : AccessDenied
          }
        ></Route>
      ) : (
        <Route
          {...rest}
          render={() =>
            user.token && user.user.type === "teacher" ? (
              children
            ) : (
              <Redirect to="/login"></Redirect>
            )
          }
        ></Route>
      )}
    </>
  );
}
