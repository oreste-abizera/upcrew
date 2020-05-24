import React from 'react'
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../Modal"
import EditQuestion from "./EditQuestion"
import { AssignmentsContext } from '../../context/AssignmentsContext';

export default function ListQuestion({ data, index: number }) {
    const { type, question_id, question, options, score, answer } = data
    const { deleteQuestion } = React.useContext(AssignmentsContext)
    return (
        <div className="container">
            <div className="question-title">
                {number + 1}. {question}
            </div>
            <div className="answer-description ml-4">
                {type === 1 && <div className="options">
                    <p className=""> <span className="main-text">Options: </span>
                        {options && options.map((record, index) => <span key={index}>{index !== 0 && ","} {record}</span>)}
                    </p>
                </div>}

                <div className="answer">
                    <p><span className="main-text">Answer: </span><span>{answer}</span></p>
                </div>

                <div className="score">
                    <p><span className="main-text mr-2">Score: </span>
                        <span><span className="text-main">/ {score} marks</span></span>
                    </p>
                </div>
            </div>
            <div className="actions d-flex">
                <Modal id={`editquestion${question_id}`} header="Change question info" opener={true} body={<EditQuestion question={data}></EditQuestion>}>
                    <button
                        className="action-btn">
                        <FaEdit className="btn-icon main-text"></FaEdit>
                    </button>
                </Modal>
                <button
                    className="action-btn"
                    onClick={() => {
                        deleteQuestion(question_id)
                    }}
                >
                    <FaTrash className="btn-icon text-danger"></FaTrash>
                </button>
            </div>
        </div>
    )
}