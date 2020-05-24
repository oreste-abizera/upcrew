import React from "react"
import { MdClose, MdAddCircleOutline } from "react-icons/md";
import { AssignmentsContext } from "../../context/AssignmentsContext";

export default function EditQuestion({ question: data = {}, edit = true, quizId }) {
    const { type, question_id = "12345676347786889644434575", question, options = [], score, answer } = data
    const [optionsData, setOptionsData] = React.useState([])
    const [index, setIndex] = React.useState(0)
    const [questionType, setQuestionType] = React.useState(type)
    const [questionTitle, setQuestionTitle] = React.useState(question || "")
    const [questionAnswer, setQuestionAnswer] = React.useState(answer || "")
    const [questionScore, setQuestionScore] = React.useState(score || "")

    const { EditQuestion, AddQuestion } = React.useContext(AssignmentsContext)

    React.useEffect(() => {
        let tempOptionsData = []
        let tempIndex = index
        for (let i = 0; i < options.length; i++) {
            const element = options[i];
            tempOptionsData = [...tempOptionsData,
            {
                id: tempIndex,
                value: element
            }]
            tempIndex++
        }
        setOptionsData(tempOptionsData)
        setIndex(tempIndex)
    }, [])

    const addOption = () => {
        let tempIndex = index
        let tempOptionsData = [...optionsData, {
            id: tempIndex,
            value: ""
        }]
        tempIndex++
        setOptionsData(tempOptionsData)
        setIndex(tempIndex)
    }

    const deleteOption = (id) => {
        let tempOptionsData = [...optionsData]
        tempOptionsData = tempOptionsData.filter(record => record.id !== id)
        setOptionsData(tempOptionsData)
    }

    const editOption = (e) => {
        const target = e.target
        const name = parseInt(target.name)
        const value = target.value
        let tempOptionsData = [...optionsData]
        tempOptionsData = tempOptionsData.map(record => {
            return record.id === name ? { ...record, value } : record
        })
        setOptionsData(tempOptionsData)
    }

    const changeType = (e) => {
        setQuestionType(parseInt(e.target.value))
    }

    const handleQuestionTitle = (e) => {
        setQuestionTitle(e.target.value)
    }

    const handleQuestionScore = (e) => {
        setQuestionScore(parseInt(e.target.value))
    }

    const handleQuestionAnswer = (e) => {
        setQuestionAnswer(e.target.value)
    }

    const handleSaveQuestion = (e) => {
        e.preventDefault()
        let finalOptions = optionsData.filter(record => record.value !== "")
        finalOptions = finalOptions.map(record => record.value)
        const finalQuestion = {
            ...data,
            type: questionType,
            question: questionTitle,
            options: finalOptions,
            answer: questionAnswer,
            score: questionScore
        }
        if (edit) {
            EditQuestion(finalQuestion)
        } else {
            AddQuestion(finalQuestion, quizId)
        }

    }



    return <div className="container">
        <form className="form-container" onSubmit={handleSaveQuestion}>

            <div className="form-group">
                <label htmlFor={`type${question_id}`}>Question type</label>
                <select className="form-control" value={questionType} id={`type${question_id}`} required onChange={changeType}>
                    <option value="">Choose Question type</option>
                    <option value={1}>Multiple Choice question</option>
                    <option value={2}>Writing question</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor={`title${question_id}`}>Question title</label>
                <input className="form-control" value={questionTitle} onChange={handleQuestionTitle} id={`title${question_id}`} required></input>
            </div>

            {questionType === 1 && (
                <div className="form-group">
                    <label>Question Options</label>
                    <div className="container-fluid row col">
                        {optionsData.map(record => (
                            <div key={record.id} className="col-6 col-md-4 my-1 option-container">
                                <MdClose className="option-close" onClick={() => {
                                    deleteOption(record.id)
                                }}></MdClose>
                                <input type="text" id={record.id + record.value} className="form-control" value={record.value} name={record.id} onChange={editOption} required></input>
                            </div>
                        ))}
                        <div className="col-6 col-md-4 my-1 text-center">
                            <MdAddCircleOutline className="add-option" onClick={addOption}></MdAddCircleOutline>
                        </div>
                    </div>
                </div>
            )}

            <div className="form-group">
                <label htmlFor={`answer${question_id}`}>Question answer</label>
                {questionType === 1 ? <select className="form-control" value={questionAnswer} onChange={handleQuestionAnswer} id={`answer${question_id}`} required>
                    <option value="">Select correct answer</option>
                    {optionsData.map(record => (
                        record.value && <option key={record.id} value={record.value}>{record.value}</option>
                    ))}
                </select> :
                    <input type="text" className="form-control" value={questionAnswer} onChange={handleQuestionAnswer} id={`answer${question_id}`} required></input>
                }

            </div>

            <div className="form-group">
                <label htmlFor={`score${question_id}`}>Question score</label>
                <input type="number" className="form-control" value={questionScore} onChange={handleQuestionScore} id={`score${question_id}`} required></input>
            </div>

            <div className="form-group">
                <input type="submit" className="btn btn-block ado-btn-outline" value={edit ? "Save Changes" : "Add Question"}></input>
            </div>
        </form>
    </div>
}