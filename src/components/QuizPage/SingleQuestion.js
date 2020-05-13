import React from 'react'

export default function SingleQuestion({ data, index:number }) {
    const { type, question_id, quiz_id, question, options, answer, score } = data
    return <div className="w3-panel">
        <div className="question-title">{number + 1}. {question} <span className="main-text">/{score} marks</span></div>
        {type === 1 ?
            <div className="question-options form-group">
                {options && options.map((item, index) => <div key={index}>
                    <input type="radio" name={question_id} value={item}></input>
                    <label className="ml-2">
                        {item}
                    </label>
                </div>)}
            </div>
            :
            <div>text question</div>}
        </div>
}