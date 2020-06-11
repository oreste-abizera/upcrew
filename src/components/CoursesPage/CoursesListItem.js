import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Modal from "../Modal";
import EditCourse from "./EditCourse";
import { deleteCourse } from "../../helpers/functions";

export default function CoursesListItem({
  course = {},
  me,
  showAlert,
  reloadContent,
  sidebarOpen,
}) {
  course.id = course._id;
  const handleDelete = async () => {
    let response = await deleteCourse(course.id, me.token);
    let message = course.name + " deleted successifully!";
    const { success, error } = response.data;
    if (success) {
      //show success alert
      window.Toast.fire({
        title: message,
      });
      reloadContent();
    } else {
      showAlert({
        type: "danger",
        message: error || "something went wrong",
      });
    }
  };

  return (
    <div
      className={
        sidebarOpen
          ? "text-center col-10 col-md-4 col-lg-4"
          : "text-center col-10 col-md-4 col-lg-3"
      }
    >
      <div className="text-center col-12 m-3 p-3 course-container">
        <h2>{course.name}</h2>
        <div className="img-container">
          <img src={course.image} alt={course.name} className="img-fluid"></img>
        </div>
        <div className="course-actions d-flex col-6 col-md-7 mx-auto my-3">
          <Modal
            id={`course${course.id}`}
            header="Update Course"
            opener={true}
            body={
              <EditCourse
                me={me}
                showAlert={showAlert}
                reloadContent={reloadContent}
                id={`course${course.id}`}
                course={course}
              ></EditCourse>
            }
          >
            <button className="action-btn">
              <FaEdit className="btn-icon main-text"></FaEdit>
            </button>
          </Modal>
          <div>
            <button className="action-btn" onClick={handleDelete}>
              <FaTrash className="btn-icon text-danger"></FaTrash>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
