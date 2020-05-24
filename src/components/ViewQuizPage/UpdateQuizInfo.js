import React from "react"
import styled from "styled-components"
import { UserContext } from "../../context/UserContext";
import { AssignmentsContext } from "../../context/AssignmentsContext";

export default function UpdateQuizInfo({ quizId, assignment = {}, edit = true }) {
    const { AddAssignment, updateAssignment } = React.useContext(AssignmentsContext)
    const { courses, classes } = React.useContext(UserContext)
    const [quizTitle, setQuizTitle] = React.useState(assignment.title || "")
    const [quizClass, setQuizClass] = React.useState(assignment.class || "")
    const [quizCourse, setQuizCourse] = React.useState(assignment.course || "")
    const [quizDuration, setQuizDuration] = React.useState(assignment.duration || "")


    const handleQuizTitle = (e) => {
        setQuizTitle(e.target.value)
    }

    const handleQuizClass = (e) => {
        setQuizClass(parseInt(e.target.value))
    }

    const handleQuizCourse = (e) => {
        setQuizCourse(parseInt(e.target.value))
    }

    const handleQuizDuration = (e) => {
        setQuizDuration(parseInt(e.target.value))
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const finalQuiz = {
            ...assignment,
            title: quizTitle,
            class: quizClass,
            course: quizCourse,
            duration: quizDuration
        }
        if (edit) {
            updateAssignment(finalQuiz)
        } else {
            AddAssignment(finalQuiz)
        }
    }

    return <UpdateQuizInfoWrapper>
        <form className="form-container" onSubmit={handleUpdate}>
            <div className="form-group">
                <label htmlFor={`QuizTitle${quizId}`}>Quiz title</label>
                <input type="text" id={`QuizTitle${quizId}`} className="form-control" required value={quizTitle} onChange={handleQuizTitle}></input>
            </div>


            <div className="form-group">
                <label htmlFor={`QuizClass${quizId}`}>Class</label>
                <select className="form-control" id={`QuizClass${quizId}`} value={quizClass} onChange={handleQuizClass}>
                    <option value="">Select Class</option>
                    {classes.map(record => <option key={record.id} value={record.id}>
                        {record.name}
                    </option>)}
                </select>
            </div>


            <div className="form-group">
                <label htmlFor={`QuizCourse${quizId}`}>Class</label>
                <select className="form-control" id={`QuizCourse${quizId}`} value={quizCourse} onChange={handleQuizCourse}>
                    <option value="">Select Course</option>
                    {courses.map(record => <option key={record.id} value={record.id}>
                        {record.name}
                    </option>)}
                </select>
            </div>


            <div className="form-group">
                <label htmlFor={`QuizDuration${quizId}`}>Quiz duration</label>
                <div className="d-flex">
                    <input type="number" id={`QuizDuration${quizId}`} className="form-control mr-2" required value={quizDuration} onChange={handleQuizDuration}></input>
                    <span> mins</span>
                </div>
            </div>

            <div className="form-group">
                <input type="submit" className="btn btn-block ado-btn-outline" value={edit ? "Update info" : "Create Quiz"}></input>
            </div>
        </form>
    </UpdateQuizInfoWrapper>
}

const UpdateQuizInfoWrapper = styled.div``