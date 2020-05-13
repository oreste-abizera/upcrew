import React from "react";
import styled from 'styled-components'
import { AssignmentsContext } from "../../context/AssignmentsContext";
import SingleQuestion from "./SingleQuestion";

export default function QuestionsList({ id }) {
    const { assignments, filteredQuestions, sortQuestions } = React.useContext(AssignmentsContext)
    React.useEffect(() => {
        sortQuestions(id)
    }, [id])
    let currentAssignment = assignments.find(item => item.id.toString() === id)
    if (filteredQuestions.length === 0) {
        return <p className="text-center my-3">Loading questions...</p>
    }

    return <QuestionsListWrapper>
        <h2 className="text-center">{currentAssignment.title}</h2>
        <hr></hr>
        <div className="questions col-lg-6 mx-auto">
            {filteredQuestions.map((record, index) => <SingleQuestion key={record.question_id} index={index} data={record}></SingleQuestion>)}
        </div>
    </QuestionsListWrapper>
}

const QuestionsListWrapper = styled.div`
`