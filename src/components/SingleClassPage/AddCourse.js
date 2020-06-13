import React from "react";
import { UserContext } from "../../context/UserContext";
import { AdoContext } from "../../context/context";
import { updateClass } from "../../helpers/functions";

export default function AddCourse({
  id = "modal01",
  classCourses = [],
  classId,
}) {
  const [course, setCourse] = React.useState("");
  const { reloadContent, courses, user } = React.useContext(UserContext);
  const { showAlert } = React.useContext(AdoContext);
  const handleCourse = (e) => {
    setCourse(e.target.value);
  };
  const handleAddCourse = async (e) => {
    e.preventDefault();
    let modal = document.getElementById(id);
    let finalCourses = new Set();
    for (let i = 0; i < classCourses.length; i++) {
      finalCourses.add(classCourses[i]);
    }
    finalCourses.add(course);
    finalCourses = [...finalCourses];
    let response = await updateClass(
      { courses: finalCourses },
      classId,
      user.token
    );
    const { success, error } = response.data;
    if (success) {
      reloadContent();
      window.Toast.fire({
        title: "course successifully added",
      });
      modal.style.display = "none";
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <form className="text-left from-container my-4" onSubmit={handleAddCourse}>
      <div className="form-group">
        <select
          className="form-control"
          required
          value={course}
          onChange={handleCourse}
        >
          <option value="">Please select course</option>
          {courses.map((item) => {
            let matchClassCourse = classCourses.find(
              (record) => record === item._id
            );
            if (!matchClassCourse) {
              return (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              );
            }
            return null;
          })}
        </select>
      </div>

      <div className="form-group">
        <input
          className="form-control ado-btn-outline"
          type="submit"
          value="Add Course"
        ></input>
      </div>
    </form>
  );
}
