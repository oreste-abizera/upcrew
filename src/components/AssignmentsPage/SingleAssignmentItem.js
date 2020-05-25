import React from "react";
import { Link } from "react-router-dom";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import { UserContext } from "../../context/UserContext";

export default function SingleAssignmentItem({ data = {}, index, type }) {
  const { results, questions, assignments } = React.useContext(AssignmentsContext)
  const { user, formatAssignment } = React.useContext(UserContext)
  const [assignment, setAssignment] = React.useState({});
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    let tempAssignment = formatAssignment(data);
    setAssignment(tempAssignment);
  }, data);

  React.useEffect(() => {
    checkDone(assignment)
  }, [assignment, results, questions, assignments])

  function checkDone(assignment) {
    let tempDone = false
    let checkQuestions = questions.filter(record => record.quiz_id === assignment.id)
    if (checkQuestions.length > 0) {
      for (let i = 0; i < checkQuestions.length; i++) {
        let doneQuestions = results.find(record => record.question_id === checkQuestions[i].question_id && record.student_id === user.user.id)
        if (doneQuestions) {
          tempDone = true
          break
        }
      }
    }

    setDone(tempDone)
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
          {type === 2 ? <Link to={`/viewQuiz/${assignment.id}`}
            className="ado-btn btn-block text-center mt-d-0 col-md-8"
          >
            View <span className="d-md-none">Quiz</span>
          </Link> : done ? <Link
            to={`/results/${assignment.id}`}
            className="main-text btn-block text-md-center ml-5 mt-1 m-md-0 col-md-8"
          >
            Results
          </Link> : <Link
                to={`/quiz/${assignment.id}`}
                className="ado-btn btn-block text-center mt-d-0 col-md-8"
              >
                Start <span className="d-md-none">Quiz</span>
              </Link>}

        </div>
      </div>
    </div>
  );
}
