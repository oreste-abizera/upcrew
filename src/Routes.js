import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";

//import pages
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DevelopersPage from "./pages/DevelopersPage";
import SupportPage from "./pages/SupportPage";
import Dashboard from "./pages/secured/Dashboard";
import Profile from "./pages/secured/Profile";
import Profile2 from "./pages/secured/Profile2";
import Students from "./pages/secured/Students";
import Teachers from "./pages/secured/Teachers";
import Assignments from "./pages/secured/Assignments";

//import components
import Navbar from "./components/Navbar";
import Alert from "./components/Alert";
import Footer from "./components/Footer";
import { ScrollButton } from "./components/ScrollButton";
import PrivateRoute from "./components/PrivateRoute";
import HeadmasterRoute from "./components/HeadmasterRoute";

//loggedIn components
import SecuredNavbar from "./components/Users/Navbar";
import Sidebar from "./components/Users/Sidebar";
import Courses from "./pages/secured/Courses";

class Routes extends Component {
  static contextType = UserContext;
  render() {
    const { user } = this.context;
    return (
      <>
        {user.token ? <SecuredNavbar /> : <Navbar />}
        {user.token && <Sidebar />}
        <Alert />
        <ScrollButton></ScrollButton>

        <Switch>
          {user.token && (
            <Redirect exact from="/home" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect exact from="/contact" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect exact from="/about" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect exact from="/support" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect exact from="/developers" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect exact from="/register" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect exact from="/login" to="/dashboard"></Redirect>
          )}
          <Redirect exact from="/" to="/home"></Redirect>
          <Route exact path="/home" component={HomePage}></Route>
          <Route path="/contact" component={ContactPage}></Route>
          <Route path="/about" component={AboutPage}></Route>
          <Route path="/login" component={LoginPage}></Route>
          <Route path="/register" component={RegisterPage}></Route>
          <Route path="/developers" component={DevelopersPage}></Route>
          <Route path="/support" component={SupportPage}></Route>
          <PrivateRoute path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <Profile></Profile>
          </PrivateRoute>
          <PrivateRoute
            path="/profile/:slug"
            component={Profile2}
          ></PrivateRoute>
          <PrivateRoute path="/courses">
            <Courses></Courses>
          </PrivateRoute>
          <PrivateRoute path="/assignments">
            <Assignments></Assignments>
          </PrivateRoute>
          <HeadmasterRoute path="/students">
            <Students></Students>
          </HeadmasterRoute>
          <HeadmasterRoute path="/teachers">
            <Teachers></Teachers>
          </HeadmasterRoute>
          <Route path="*" component={ErrorPage}></Route>
        </Switch>
        {!user.token && <Footer />}
      </>
    );
  }
}

export default Routes;
