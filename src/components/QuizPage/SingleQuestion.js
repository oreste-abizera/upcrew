import React from "react";

export default function SingleQuestion({
  data,
  index: number,
  values,
  handleChange,
}) {
  const { type, _id, question, options, score } = data;
  let questionValue = values.find((item) => item.id === _id);
  questionValue = questionValue || {};
  return (
    <div className="w3-panel">
      <label htmlFor={`textarea${_id}`} className="question-title">
        {number + 1}. {question}{" "}
        <span className="main-text">/{score} marks</span>
      </label>
      {type === "MCQ" && options ? (
        <div className="question-options form-group">
          {options &&
            options.map((item, index) => (
              <div key={index}>
                <input
                  type="radio"
                  name={`${_id}`}
                  value={item}
                  id={`radio${_id}${index}`}
                  onChange={handleChange}
                ></input>
                <label className="ml-2" htmlFor={`radio${_id}${index}`}>
                  {item}
                </label>
              </div>
            ))}
        </div>
      ) : (
        <div>
          <textarea
            placeholder="Answer goes here."
            className="p-2 mt-1 no-resize"
            cols="50"
            rows="7"
            name={`${_id}`}
            id={`textarea${_id}`}
            onChange={handleChange}
            value={questionValue.value}
          ></textarea>
        </div>
      )}
    </div>
  );
}
