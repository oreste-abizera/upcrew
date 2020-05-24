import React from "react";
import styled from 'styled-components'
import { AssignmentsContext } from "../../context/AssignmentsContext";
import ListQuestion from "./ListQuestion"
import Modal from "../Modal";
import UpdateQuizInfo from "./UpdateQuizInfo";
import EditQuestion from "./EditQuestion";

export default function ListQuizInfo({ id }) {
    const { assignments, sortQuestions, deleteAssignment, updateAssignment } = React.useContext(AssignmentsContext)
    const [marks, setMarks] = React.useState(0)
    const [time, setTime] = React.useState(0)
    const [filteredQuestions, setFilteredQuestions] = React.useState([])

    let currentAssignment = assignments.find(item => item.id.toString() === id)
    React.useEffect(() => {
        setTime(currentAssignment.duration)
    }, [currentAssignment])

    React.useEffect(() => {
        let tempQuestions = sortQuestions(id)
        setFilteredQuestions(tempQuestions)
    }, [id])

    React.useEffect(() => {
        let totalMarks = filteredQuestions.reduce((pr, curr) => {
            return pr += curr.score
        }, 0)
        setMarks(totalMarks)
    }, [filteredQuestions])


    return <ListQuizInfoWrapper>
        <div className="container col-lg-8 mx-auto">
            <h2>{currentAssignment.title} <span className="main-text"> /{marks} marks</span></h2>
            <hr></hr>
            <div className="timer" id="time">{time} mins</div>
            <div className="questions">
                {filteredQuestions.length === 0 && <p className="text-center">0 questions found.</p>}
                {filteredQuestions.map((record, index) => <ListQuestion key={record.question_id} index={index} data={record}></ListQuestion>)}
                <div className="d-flex">
                    <Modal opener={true} id="updateAssignmentInfo" header="Update Quiz Info" body={<UpdateQuizInfo quizId={id} assignment={currentAssignment} updateAssignment={updateAssignment}></UpdateQuizInfo>}>
                        <button className="ado-btn col-12">Update Info</button>
                    </Modal>
                    <Modal opener={true} id={`addQuestion`} header="Add question" body={<EditQuestion quizId={id} edit={false}></EditQuestion>}>
                        <button className="ado-btn col-12">Add Question</button>
                    </Modal>
                    <div>
                        <button onClick={() => {
                            deleteAssignment(id)
                        }} className="ado-btn col-12">Delete Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    </ListQuizInfoWrapper>
}

const ListQuizInfoWrapper = styled.div`
position: relative;
.timer{
    position: fixed !important;
    top: 4rem;
    right: 3rem;
    /* right: 7rem; */
    padding: 1rem;
    z-index: 1;
    /* background: #d9edf7; */
    background: var(--primaryColor);
}
.options-container{
    position: relative;
}
.option-close{
    position: absolute;
    top: 0;
    right: 1rem;
    font-size: 1.5rem;
    color: var(--primaryColor);
    cursor: pointer;
}
.add-option{
    font-size: 1.5rem;
    color: var(--primaryColor);
    text-align: center;
    cursor: pointer;
}
@media screen and (max-width:576px){
    .timer{
        top: 8rem;
        right: 7rem;
    }
}
@media screen and (min-width:786px){
    margin-right: 3rem;
}
`