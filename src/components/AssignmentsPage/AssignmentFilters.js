import React from "react";
import { AssignmentsContext } from "../../context/AssignmentsContext";

export default function AssignmentFilters() {
  const {
    title,
    course,
    status,
    courses,
    duration,
    maxDuration,
    handleTitle,
    handleDuration,
    handleCourse,
    handleStatus,
  } = React.useContext(AssignmentsContext);
  let coursesOptions = new Set();
  for (let i = 0; i < courses.length; i++) {
    coursesOptions.add(
      <option value={courses[i]._id} key={courses[i]._id}>
        {courses[i].name}
      </option>
    );
  }
  coursesOptions = [...coursesOptions];

  return (
    <div className="container-fluid d-md-flex">
      <div className="form-group col-md-4">
        <label>Search by title</label>
        <input
          type="text"
          className="form-control"
          onChange={handleTitle}
          value={title}
        ></input>
      </div>
      <div className="form-group col-md-4">
        <label>Course</label>
        <select className="form-control" value={course} onChange={handleCourse}>
          <option value="all">All</option>
          {coursesOptions}
        </select>
      </div>

      <div className="form-group col-md-4">
        <label>Status</label>
        <select className="form-control" value={status} onChange={handleStatus}>
          <option value="all">All</option>
          {[
            { id: 1, value: "unpublished" },
            { id: 2, value: "published" },
            { id: 3, value: "completed" },
          ].map((item) => (
            <option key={item.id} value={item.value}>
              {item.value}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group col-md-4">
        <label>Duration: {duration} mins</label>
        <input
          type="range"
          className="form-control"
          onChange={handleDuration}
          min="0"
          max={maxDuration}
          value={duration}
        ></input>
      </div>
    </div>
  );
}
