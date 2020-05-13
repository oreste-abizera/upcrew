import React from 'react'

export default function SingleQuestion({ data, index:number }) {
    const { type, question_id, quiz_id, question, options, answer, score } = data
    return <div className="w3-panel">
        <label htmlFor={`textarea${question_id}`} className="question-title">{number + 1}. {question} <span className="main-text">/{score} marks</span></label>
        {type === 1 && options ?
            <div className="question-options form-group">
                {options && options.map((item, index) => <div key={index}>
                    <input type="radio" name={question_id} value={item} id={`radio${question_id}${index}`}></input>
                    <label className="ml-2" htmlFor={`radio${question_id}${index}`}>
                        {item}
                    </label>
                </div>)}
            </div>
            :
            <div>
                <textarea placeholder="Answer goes here." className="p-2 mt-1 no-resize" cols="50" rows="7" name={question_id} id={`textarea${question_id}`}></textarea>
            </div>}
        </div>
}