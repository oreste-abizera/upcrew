import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { AssignmentsContext } from "../../context/AssignmentsContext"
import QuestionsList from "../../components/QuizPage/QuestionsList";
import Loader from "../../components/Loader";

export default function QuizPage(props) {
  const { history } = props
  const { id } = props.match.params
  const { sidebarOpen, user } = React.useContext(UserContext);
  const { assignments, questions, results } = React.useContext(AssignmentsContext);
  const found = assignments.find(record => record.id.toString() === id)
  
  if (!found) {
    return <QuizPageWrapper sidebarOpen={sidebarOpen}>
      <Loader text="Quiz info loading..."></Loader>
    </QuizPageWrapper>
  } else {
    let tempQuestions = questions.filter(record => record.quiz_id === found.id)
    for (let i = 0; i < tempQuestions.length; i++) {
      const element = tempQuestions[i];
      let tempResults = results.find(item => item.question_id === element.question_id && item.student_id === user.user.id)
      if (tempResults) {
        history.push(`/results/${id}`)
      }
    }
  }
  return (
    <QuizPageWrapper sidebarOpen={sidebarOpen}>
      <QuestionsList id={id}></QuestionsList>
    </QuizPageWrapper>
  );
}

const QuizPageWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
