import React from 'react'
import styled from 'styled-components'

export default function AnswerListItem({ index, question, userId, results }) {
    let [questionResult, setQuestionResult] = React.useState({})


    React.useEffect(() => {
        let tempResult = results.find(record => record.question_id === question.question_id && record.student_id === userId)
        setQuestionResult(tempResult)
    },[results,question,userId])

    return <AnswerListItemWrapper>
        <div className="container">
            <div className="question-title">
                {index + 1}. {question.question}
            </div>
            <div className="answer-description ml-4">
                {question.type === 1 && <div className="options d-flex">
                    <p className="main-text mr-2">Options: </p>
                    {question.options && question.options.map((record, index) => <span key={index}>{index !== 0 && ","} {record}</span>)}
                </div>}

                <div className="answer d-flex">
                    <p className="main-text mr-2">Answer: </p>
                    <span>{question.answer}</span>
                </div>

                <div className="myAnswer d-flex">
                    <p className="main-text mr-2">My Answer: </p>
                    <span>{questionResult.answer}</span>
                </div>

                <div className="score d-flex">
                    <p className="main-text mr-2">Score: </p>
                    <span>{questionResult.score} <span className="text-main">/ {question.score} marks</span></span>
                </div>
            </div>

        </div>
    </AnswerListItemWrapper>
}

const AnswerListItemWrapper = styled.div``