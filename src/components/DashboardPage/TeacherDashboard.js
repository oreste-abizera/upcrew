import React from "react";
import { UserContext } from "../../context/UserContext";
import DisplayClass from "./TeacherDashboard/DisplayClass";
import Heading from "../Heading"

export default function TeacherDashboard() {
  const { classes, user: { user } } = React.useContext(UserContext)
  let myClass = classes.find(record => record.classTeacher === user.id)
  return <div className="container-fluid">
    <div className="row">
      <Heading title="Teacher Dashboard"></Heading>
      {myClass && <DisplayClass currentClass={myClass}></DisplayClass>}
      {/* <DisplayClass currentClass={myClass}></DisplayClass> */}
    </div>
  </div>;
}
