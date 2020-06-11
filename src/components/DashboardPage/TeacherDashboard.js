import React from "react";
import { UserContext } from "../../context/UserContext";
import DisplayClass from "../ClassesPage/DisplayClass";
import Heading from "../Heading";

export default function TeacherDashboard() {
  const {
    classes,
    user: { user },
  } = React.useContext(UserContext);
  let myClasses = classes.filter((record) => record.classTeacher === user.id);
  return (
    <div className="container-fluid">
      <div className="row">
        <Heading title="Teacher Dashboard"></Heading>
        {myClasses.map((record) => (
          <DisplayClass key={record._id} currentClass={record}></DisplayClass>
        ))}
      </div>
    </div>
  );
}
