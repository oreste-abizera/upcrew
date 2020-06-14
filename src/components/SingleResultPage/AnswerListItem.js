import React from "react";
import styled from "styled-components";

export default function AnswerListItem({ index, question, userId, results }) {
  let [questionResult, setQuestionResult] = React.useState({});

  React.useEffect(() => {
    let tempResult = results.find(
      (record) =>
        record.question_id === question._id && record.student_id === userId
    );
    setQuestionResult(tempResult);
  }, [results, question, userId]);

  return (
    <AnswerListItemWrapper>
      <div className="container">
        <div className="question-title">
          {index + 1}. {question.question}
        </div>
        <div className="answer-description ml-4">
          {question.type === 1 && (
            <div className="options">
              <p className="">
                {" "}
                <span className="main-text">Options: </span>
                {question.options &&
                  question.options.map((record, index) => (
                    <span key={index}>
                      {index !== 0 && ","} {record}
                    </span>
                  ))}
              </p>
            </div>
          )}

          <div className="answer">
            <p>
              <span className="main-text">Answer: </span>
              <span>{question.answer}</span>
            </p>
          </div>

          <div className="myAnswer">
            <p>
              <span className="main-text">My Answer: </span>
              <span>{questionResult.answer}</span>
            </p>
          </div>

          <div className="score">
            <p>
              <span className="main-text mr-2">Score: </span>
              <span>
                {questionResult.score}{" "}
                <span className="text-main">/ {question.score} marks</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </AnswerListItemWrapper>
  );
}

const AnswerListItemWrapper = styled.div``;
