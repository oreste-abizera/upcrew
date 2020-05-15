import React from 'react'
import styled from 'styled-components'
import AnswerListItem from './AnswerListItem'

export default function ResultsList({ quizId, results, questions, assignments, userId }) {
    const [title, setTitle] = React.useState("")
    const [totalMarks, setTotalMarks] = React.useState(0)
    const [totalScore, setTotalScore] = React.useState(0)
    const [quizQuestions, setQuizQuestions] = React.useState(questions)



    React.useEffect(() => {
        let currentAssignment = assignments.find(record => record.id.toString() === quizId)
        if (!currentAssignment) currentAssignment = {}
        let tempTitle = currentAssignment.title

        let tempQuestions = questions.filter(record => record.quiz_id.toString() === quizId)
        let tempTotalMarks = tempQuestions.reduce((pr, curr) => {
            return pr += curr.score
        }, 0)

        let tempScore = 0
        for (let i = 0; i < tempQuestions.length; i++) {
            const question = tempQuestions[i];
            let questionResult = results.find(record => record.question_id === question.question_id && record.student_id === userId)
            tempScore += questionResult.score
        }

        setTotalScore(tempScore)
        setQuizQuestions(tempQuestions)
        setTotalMarks(tempTotalMarks)
        setTitle(tempTitle)
    }, [quizId, results, questions, assignments])




    return <ResultsListWrapper>
        <div className="container col-lg-8 mx-auto">
            <h2 className="">{title} <span className="main-text"> /{totalMarks} marks</span></h2>
            <hr></hr>
            {quizQuestions.map((record, index) => <AnswerListItem key={record.question_id} index={index} question={record} userId={userId} results={results}></AnswerListItem>)}
            <div className="totalScore mt-3 d-flex">
                <p className="main-text mr-3">Total Score: </p>
                <span className="main-text">{totalScore} / {totalMarks} marks</span>
            </div>
        </div>
    </ResultsListWrapper>
}

const ResultsListWrapper = styled.div``