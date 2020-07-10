import React from "react";
import { UserContext } from "../../context/UserContext";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import styled from "styled-components";
import AnswersList from "../../components/SingleResultPage/AnswersList";
import Loader from "../../components/Loader";

export default function SingleResultPage(props) {
  const { id: quizId } = props.match.params;
  const { user, sidebarOpen } = React.useContext(UserContext);
  const { assignments, questions, results } = React.useContext(
    AssignmentsContext
  );
  const [found, setFound] = React.useState(false);

  React.useEffect(() => {
    let tempFound = false;
    const findQuiz = assignments.find((record) => record._id === quizId);
    if (findQuiz) {
      //find questions
      let findQuestions = questions.filter(
        (record) => record.quiz_id === quizId
      );

      //loop through found questions
      for (let i = 0; i < findQuestions.length; i++) {
        const currentQuestion = findQuestions[i];

        //find results
        let findResults = results.find(
          (record) =>
            record.question_id === currentQuestion._id &&
            record.student_id === user.user._id
        );
        if (findResults) {
          tempFound = true;
          break;
        }
      }
    }

    setFound(tempFound);
  }, [quizId, assignments, questions, results]);

  if (!found) {
    return (
      <SingleResultPageWrapper sidebarOpen={sidebarOpen}>
        <Loader text="Loading assignment's data..."></Loader>
      </SingleResultPageWrapper>
    );
  }
  return (
    <SingleResultPageWrapper sidebarOpen={sidebarOpen}>
      <AnswersList
        quizId={quizId}
        results={results}
        questions={questions}
        assignments={assignments}
        userId={user.user.id}
      ></AnswersList>
    </SingleResultPageWrapper>
  );
}

const SingleResultPageWrapper = styled.div`
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
