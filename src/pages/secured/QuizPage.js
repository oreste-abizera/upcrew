import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import {AssignmentsContext} from "../../context/AssignmentsContext"
import QuestionsList from "../../components/QuizPage/QuestionsList";

export default function QuizPage(props) {
  const {id} = props.match.params
  const { sidebarOpen } = React.useContext(UserContext);
  const { assignments } = React.useContext(AssignmentsContext);
  const found = assignments.find(record=>record.id.toString()===id)
  if(!found){
    return <QuizPageWrapper sidebarOpen={sidebarOpen}>
    <p className="text-center mt-3">Quiz info loading...</p>
  </QuizPageWrapper>
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
