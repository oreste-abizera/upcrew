import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PublicRoute({ children, component, ...rest }) {
  return (
    <>
      <Navbar />
      {component ? (
        <Route {...rest} component={component}></Route>
      ) : (
        <Route
          {...rest}
          render={() => {
            return children;
          }}
        ></Route>
      )}
      <Footer></Footer>
    </>
  );
}
