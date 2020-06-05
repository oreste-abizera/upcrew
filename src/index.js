import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import "./panel.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { AdoProvider } from "./context";
import { UserProvider } from "./context/UserContext";
import { AssignmentsProvider } from "./context/AssignmentsContext";
import { MessagesProvider } from "./context/MessagesContext";

ReactDOM.render(
  <UserProvider>
    <MessagesProvider>
      <AssignmentsProvider>

        <AdoProvider>
          <Router>
            <App />
          </Router>
        </AdoProvider>

      </AssignmentsProvider>
    </MessagesProvider>
  </UserProvider >,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
