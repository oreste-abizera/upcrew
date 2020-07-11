import React from "react";
import styled from "styled-components";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import ListQuestion from "./ListQuestion";
import Modal from "../Modal";
import UpdateQuizInfo from "./UpdateQuizInfo";
import EditQuestion from "./EditQuestion";
import { editAssignment } from "../../helpers/functions";
import { UserContext } from "../../context/UserContext";

export default function ListQuizInfo({ id }) {
  const {
    assignments,
    sortQuestions,
    deleteAssignment,
    updateAssignment,
    questions,
  } = React.useContext(AssignmentsContext);
  const { user: me, solveResponse } = React.useContext(UserContext);
  const [marks, setMarks] = React.useState(0);
  const [time, setTime] = React.useState(0);
  const [filteredQuestions, setFilteredQuestions] = React.useState([]);

  let currentAssignment = assignments.find((item) => item._id === id);
  React.useEffect(() => {
    setTime(currentAssignment.duration);
  }, [currentAssignment]);

  React.useEffect(() => {
    let tempQuestions = sortQuestions(id);
    setFilteredQuestions(tempQuestions);
  }, [id, questions]);

  React.useEffect(() => {
    let totalMarks = filteredQuestions.reduce((pr, curr) => {
      return (pr += curr.score);
    }, 0);
    setMarks(totalMarks);
  }, [filteredQuestions]);

  const changeStatus = async (value) => {
    value = value === "completeed" ? "completed" : value;
    let response = await editAssignment(
      { status: value },
      currentAssignment._id,
      me.token
    );
    solveResponse(response, "Quiz status changed");
  };

  let value =
    currentAssignment.status === "unpublished" &&
    currentAssignment.status === "completed"
      ? "publish"
      : currentAssignment.status === "published"
      ? "complete"
      : "publish";

  return (
    <ListQuizInfoWrapper>
      <div className="container col-lg-8 mx-auto">
        <p className="status p-3">
          status:{" "}
          <span className="badge badge-success p-2">
            {currentAssignment.status}
          </span>
          <button
            onClick={() => changeStatus(`${value}ed`)}
            className="btn ado-btn-outline btn-sm ml-4"
          >
            {value}
          </button>
        </p>
        <h2>
          {currentAssignment.title}{" "}
          <span className="main-text"> /{marks} marks</span>
        </h2>
        <hr></hr>
        <div className="timer" id="time">
          {time} mins
        </div>
        <div className="questions">
          {filteredQuestions.length === 0 && (
            <p className="text-center">0 questions found.</p>
          )}
          {filteredQuestions.map((record, index) => (
            <ListQuestion
              key={record._id}
              index={index}
              data={record}
            ></ListQuestion>
          ))}
          <div className="row">
            <Modal
              opener={true}
              id="updateAssignmentInfo"
              header="Update Quiz Info"
              body={
                <UpdateQuizInfo
                  quizId={id}
                  assignment={currentAssignment}
                  updateAssignment={updateAssignment}
                ></UpdateQuizInfo>
              }
            >
              <button className="ado-btn col-12">Update Info</button>
            </Modal>
            <Modal
              opener={true}
              id={`addQuestion`}
              header="Add question"
              body={<EditQuestion quizId={id} edit={false}></EditQuestion>}
            >
              <button className="ado-btn col-12">Add Question</button>
            </Modal>
            <div>
              <button
                onClick={() => {
                  deleteAssignment(id);
                }}
                className="ado-btn col-12"
              >
                Delete Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </ListQuizInfoWrapper>
  );
}

const ListQuizInfoWrapper = styled.div`
  position: relative;
  .timer {
    position: fixed !important;
    top: 4rem;
    right: 3rem;
    /* right: 7rem; */
    padding: 1rem;
    z-index: 1;
    /* background: #d9edf7; */
    background: var(--primaryColor);
  }
  .options-container {
    position: relative;
  }
  .option-close {
    position: absolute;
    top: 0;
    right: 1rem;
    font-size: 1.5rem;
    color: var(--primaryColor);
    cursor: pointer;
  }
  .add-option {
    font-size: 1.5rem;
    color: var(--primaryColor);
    text-align: center;
    cursor: pointer;
  }
  @media screen and (max-width: 576px) {
    .timer {
      top: 8rem;
      right: 7rem;
    }
  }
  @media screen and (min-width: 768px) {
    margin-right: 3rem;
  }
`;
