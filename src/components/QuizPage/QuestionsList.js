import React from "react";
import styled from 'styled-components'
import { AssignmentsContext } from "../../context/AssignmentsContext";
import SingleQuestion from "./SingleQuestion";


const getTime = (time = 0) => {
    time = parseInt(time)
    let countdownDate = new Date()
    countdownDate.setMinutes(countdownDate.getMinutes() + time)
    var timerInterval = setInterval(() => {
        var date = new Date().getTime()
        var distance = countdownDate - date
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.getElementById("timer").innerHTML = days > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` : hours > 0 ? `${hours}h ${minutes}m ${seconds}s` : `${minutes}m ${seconds}s`
        if (distance <= 0) {
            clearInterval(timerInterval)
            document.getElementById("timer").innerHTML = "Time up"
        }
    }, 1000);
}
export default function QuestionsList({ id }) {
    const { assignments, submitAssignment, filteredQuestions, sortQuestions } = React.useContext(AssignmentsContext)
    const [values, setValues] = React.useState([])
    const [marks, setMarks] = React.useState(0)
    const [time, setTime] = React.useState(5)
    let currentAssignment = assignments.find(item => item.id.toString() === id)

    React.useEffect(() => {
        setTime(currentAssignment.duration)    
    },[])
    
    React.useEffect(() => {
        sortQuestions(id)
    }, [id])



    React.useEffect(() => {
        let totalMarks = filteredQuestions.reduce((pr, curr) => {
            return pr += curr.score
        }, 0)
        setMarks(totalMarks)
        getTime(time)
    }, [filteredQuestions])



    if (filteredQuestions.length === 0) {
        return <p className="text-center my-3">Loading questions...</p>
    }



    React.useEffect(() => {
        let tempValues = []
        for (let i = 0; i < filteredQuestions.length; i++) {
            tempValues = [...tempValues, { id: `question${filteredQuestions[i].question_id}`, value: "" }]
        }
        setValues(tempValues)
    }, [filteredQuestions])

    const handleSubmit = (e) => {
        e.preventDefault()
        submitAssignment(values, id)
    }

    const handleChange = (e) => {
        let tempValues = values.map(item => item.id === e.target.name ? { ...item, value: e.target.value } : item)
        setValues(tempValues)
    }


    return <QuestionsListWrapper>
        <h2 className="text-center">{currentAssignment.title} <span className="main-text"> /{marks} marks</span></h2>
        <hr></hr>
        <div className="timer" id="timer"></div>
        <form className="questions col-lg-6 mx-auto" onSubmit={handleSubmit}>
            {filteredQuestions.map((record, index) => <SingleQuestion key={record.question_id} index={index} data={record} values={values} handleChange={handleChange}></SingleQuestion>)}
            <button className="ado-btn btn-block col-10 mx-auto mx-lg-0">Submit</button>
        </form>
    </QuestionsListWrapper>
}

const QuestionsListWrapper = styled.div`
.timer{
    position: fixed;
    top: 4rem;
    right: 0;
    padding: 1rem;
    z-index: 1;
    /* background: #d9edf7; */
    background: var(--primaryColor);
}
`