import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function HeadmasterRoute({ children, ...rest }) {
  const { user } = React.useContext(UserContext);
  return (
    <Route
      {...rest}
      render={() => (user.token && user.user.type === 3 ? children : <Redirect to="/login"></Redirect>)}
    ></Route>
  );
}
