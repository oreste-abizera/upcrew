import React, { Component } from "react";
import { Switch, Redirect } from "react-router-dom";
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
import QuizPage from "./pages/secured/QuizPage"
import ViewQuizPage from "./pages/secured/ViewQuizPage";
import ResultsPage from "./pages/secured/ResultsPage"
import SingleResultPage from "./pages/secured/SingleResultPage";
import ExamsPage from "./pages/secured/ExamsPage";
import MessagesPage from "./pages/secured/MessagesPage";
import Classes from "./pages/secured/Classes";
import LibraryBooks from "./pages/secured/LibraryBooks";

//import components
import Alert from "./components/Alert";
import { ScrollButton } from "./components/ScrollButton";
import Route from "./components/Route"
import PrivateRoute from "./components/PrivateRoute";
import HeadmasterRoute from "./components/HeadmasterRoute";


class Routes extends Component {
  static contextType = UserContext;
  render() {
    const { user } = this.context;
    return (
      <>
        <Alert />
        <ScrollButton></ScrollButton>
        <Switch>
          {user.token && (
            <Redirect pop exact from="/login" to="/dashboard"></Redirect>
          )}
          {user.token && (
            <Redirect pop exact from="/register" to="/dashboard"></Redirect>
          )}
          <Redirect exact from="/" to="/home"></Redirect>
          <Route exact path="/home" component={HomePage}></Route>
          <Route exact path="/contact" component={ContactPage}></Route>
          <Route exact path="/about" component={AboutPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
          <Route exact path="/developers" component={DevelopersPage}></Route>
          <Route exact path="/support" component={SupportPage}></Route>
          <PrivateRoute exact path="/dashboard">
            <Dashboard></Dashboard>
          </PrivateRoute>
          <PrivateRoute exact path="/profile">
            <Profile></Profile>
          </PrivateRoute>
          <PrivateRoute
            exact
            path="/profile/:slug"
            component={Profile2}
          ></PrivateRoute>
          <PrivateRoute exact path="/classes">
            <Classes></Classes>
          </PrivateRoute>
          <PrivateRoute exact path="/assignments">
            <Assignments></Assignments>
          </PrivateRoute>
          <PrivateRoute exact path="/books" component={LibraryBooks}></PrivateRoute>
          <HeadmasterRoute exact path="/students">
            <Students></Students>
          </HeadmasterRoute>
          <HeadmasterRoute exact path="/teachers" component={Teachers}></HeadmasterRoute>
          <PrivateRoute exact path="/quiz/:id" component={QuizPage}></PrivateRoute>
          <PrivateRoute exact path="/viewQuiz/:id" component={ViewQuizPage}></PrivateRoute>
          <PrivateRoute exact path="/results" component={ResultsPage}></PrivateRoute>
          <PrivateRoute exact path="/results/:id" component={SingleResultPage}></PrivateRoute>
          <PrivateRoute exact path="/exams" component={ExamsPage}></PrivateRoute>
          <PrivateRoute exact path="/messages" component={MessagesPage}></PrivateRoute>
          {user.token ?
            <PrivateRoute path="*" component={ErrorPage}></PrivateRoute>
            :
            <Route path="*" component={ErrorPage}></Route>
          }
        </Switch>
      </>
    );
  }
}

export default Routes;
