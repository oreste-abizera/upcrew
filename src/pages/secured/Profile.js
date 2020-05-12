import React, { Component } from "react";
import { UserContext } from "../../context/UserContext";
import { Redirect } from "react-router-dom";

export default class Profile extends Component {
  static contextType = UserContext;
  render() {
    const { user } = this.context;
    //get Personal info
    let { user: PersonalInfo } = user;

    return <Redirect to={`/profile/${PersonalInfo.id}`}></Redirect>;
  }
}
