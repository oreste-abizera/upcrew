import React from "react";
import { formatAssignment } from "../../helpers/functions";
import { Link } from "react-router-dom";

export default function SingleAssignmentItem({ data = {}, index }) {
  const [assignment, setAssignment] = React.useState({});

  React.useEffect(() => {
    mount();
  }, data);

  async function mount() {
    let tempAssignment = await formatAssignment(data);
    setAssignment(tempAssignment);
  }
  return (
    <div className="container-fluid my-4">
      <div className="row">
        <div className="col-12 col-md-1">
          <span className="main-text d-md-none">#: </span>
          {index + 1}
        </div>
        <div className="col-12 col-md-2">
          <span className="main-text d-md-none">Title: </span>
          {assignment.title}
        </div>
        <div className="col-12 col-md-2">
          <span className="main-text d-md-none">Course: </span>
          {assignment.course}
        </div>
        <div className="col-12 col-md-2">
          <span className="main-text d-md-none">Class: </span>
          {assignment.class}
        </div>
        <div className="col-12 col-md-2">
          <span className="main-text d-md-none">Teacher: </span>
          {assignment.teacher}
        </div>
        <div className="col-12 col-md-1">
          <span className="main-text d-md-none">Duration: </span>
          {assignment.duration} mins
        </div>
        <div className="col-8 col-md-2">
          <Link
            to={`/quiz/${assignment.id}`}
            className="ado-btn btn-block text-center mt-d-0 col-md-8"
          >
            Start <span className="d-md-none">Quiz</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
