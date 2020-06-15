import React from "react";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import { UserContext } from "../../context/UserContext";
import SingleAssignmentItem from "./SingleAssignmentItem";
import Heading from "../Heading";
import AssignmentsColumns from "./AssignmentsColumns";
import AssignmentFilters from "./AssignmentFilters";
import Modal from "../Modal";
import UpdateQuizInfo from "../ViewQuizPage/UpdateQuizInfo";

export default function AssignmentsList() {
  const { user, users } = React.useContext(UserContext);
  const { filteredAssignments, questions, results } = React.useContext(
    AssignmentsContext
  );
  const [stateUser, setStateUser] = React.useState({});
  const [checkedAssignments, setCheckedAssignments] = React.useState([]);
  React.useEffect(() => {
    let tempUser = users.find((record) => record._id === user.user._id);
    if (tempUser) {
      setStateUser(tempUser);
    }
  }, [users]);

  React.useEffect(() => {
    let tempAssignments;

    //if user is a teacher
    if (user.user.type === "teacher") {
      tempAssignments = filteredAssignments.filter(
        (record) => record.teacher === user.user._id
      );
    } else {
      tempAssignments = filteredAssignments.filter(
        (record) => record.class === stateUser.currentClass
      );
      //check if it is done
      for (let i = 0; i < tempAssignments.length; i++) {
        let quizQuestions = questions.filter(
          // eslint-disable-next-line
          (item) => item.quiz_id === tempAssignments[i]._id
        );
        let done = false;
        //check results of the question by me
        for (let j = 0; j < quizQuestions.length; j++) {
          let quizResults = results.find(
            (item) =>
              item.question_id === quizQuestions[j]._id &&
              item.student_id === user.user._id
          );
          if (quizResults) {
            done = true;
            break;
          }
        }
        if (done) {
          tempAssignments = tempAssignments.filter(
            // eslint-disable-next-line
            (item) => item._id !== tempAssignments[i]._id
          );
        }
      }
    }
    setCheckedAssignments(tempAssignments);
  }, [filteredAssignments, stateUser, questions, results]);

  return (
    <>
      <Heading title="Assignments list"></Heading>
      <AssignmentFilters></AssignmentFilters>
      {user.user.type === "teacher" && (
        <div className="container-fluid">
          <Modal
            buttonName="New Assignment"
            header="Create Assignment"
            body={<UpdateQuizInfo edit={false}></UpdateQuizInfo>}
          ></Modal>
        </div>
      )}
      <p className="text-center mt-2">
        {checkedAssignments.length} assignments found.
      </p>
      <AssignmentsColumns></AssignmentsColumns>
      {checkedAssignments.length === 0 && (
        <p className="text-center">No assignment found</p>
      )}
      {checkedAssignments.map((record, index) => (
        <SingleAssignmentItem
          key={record._id}
          data={record}
          index={index}
          type={user.user.type}
        ></SingleAssignmentItem>
      ))}
    </>
  );
}
