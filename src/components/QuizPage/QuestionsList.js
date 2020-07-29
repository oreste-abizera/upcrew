import React from "react";
import styled from "styled-components";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import SingleQuestion from "./SingleQuestion";
import Loader from "../Loader";

const getTime = (distance) => {
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return days > 0
    ? `${days}d ${hours}h ${minutes}m ${seconds}s`
    : hours > 0
    ? `${hours}h ${minutes}m ${seconds}s`
    : `${minutes}m ${seconds}s`;
};
export default function QuestionsList({ id }) {
  const {
    assignments,
    submitAssignment,
    sortQuestions,
    questions,
  } = React.useContext(AssignmentsContext);
  const [values, setValues] = React.useState([]);
  const [marks, setMarks] = React.useState(0);
  const [filteredQuestions, setFilteredQuestions] = React.useState([]);
  const [status, setstatus] = React.useState();
  const [submit, setsubmit] = React.useState(false);

  let currentAssignment = assignments.find((item) => item._id === id);

  React.useEffect(() => {
    let tempQuestions = sortQuestions(id);
    setFilteredQuestions(tempQuestions);
  }, [id, questions]);

  React.useEffect(() => {
    let totalMarks = filteredQuestions.reduce((pr, curr) => {
      return (pr += curr.score);
    }, 0);
    setMarks(totalMarks);

    let countdownDate = new Date();
    countdownDate.setMinutes(
      countdownDate.getMinutes() + parseInt(currentAssignment.duration)
    );

    var timerInterval = setInterval(() => {
      var date = new Date().getTime();
      var distance = countdownDate - date;
      const tempStatus = getTime(distance);
      setstatus(tempStatus);
      if (distance <= 0) {
        clearInterval(timerInterval);
        setstatus("Time Up");
        if (!submit) {
          document.getElementById(`button${currentAssignment._id}`).click();
        }
      }
    }, 1000);

    //set values placeholders
    let tempValues = [];
    for (let i = 0; i < filteredQuestions.length; i++) {
      tempValues = [...tempValues, { id: filteredQuestions[i]._id, value: "" }];
    }
    setValues(tempValues);
  }, [filteredQuestions]);

  if (filteredQuestions.length === 0) {
    return <Loader text="Loading questions..."></Loader>;
  }

  // React.useEffect(() => {
  //     let tempValues = []
  //     for (let i = 0; i < filteredQuestions.length; i++) {
  //         tempValues = [...tempValues, { id: `question${filteredQuestions[i].question_id}`, value: "" }]
  //     }
  //     setValues(tempValues)
  // }, [filteredQuestions])

  function enableBeforeUnload() {
    window.onbeforeunload = (e) => {
      return "Discard Changes?";
    };
  }
  function disableBeforeUnload() {
    window.onbeforeunload = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    disableBeforeUnload();
    setsubmit(true);
    if (!submit) {
      console.log("submitting the quiz");
      await submitAssignment(values, id);
    }
  };

  const handleChange = (e) => {
    enableBeforeUnload();
    let tempValues = values.map((item) =>
      item.id === e.target.name ? { ...item, value: e.target.value } : item
    );
    setValues(tempValues);
  };

  return (
    <QuestionsListWrapper>
      <div className="container col-lg-8 mx-auto">
        <h2>
          {currentAssignment.title}{" "}
          <span className="main-text"> /{marks} marks</span>
        </h2>
        <hr></hr>
        <div className="timer" id="timer">
          {status}
        </div>
        <form className="questions" onSubmit={handleSubmit}>
          {filteredQuestions.map((record, index) => (
            <SingleQuestion
              key={record._id}
              index={index}
              data={record}
              values={values}
              handleChange={handleChange}
            ></SingleQuestion>
          ))}
          <button
            className="ado-btn btn-block col-10 mx-auto mx-lg-0"
            type="submit"
            id={`button${currentAssignment._id}`}
          >
            Submit
          </button>
        </form>
      </div>
    </QuestionsListWrapper>
  );
}

const QuestionsListWrapper = styled.div`
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
