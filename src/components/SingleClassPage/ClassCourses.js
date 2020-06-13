import React from "react";
import { UserContext } from "../../context/UserContext";
import { FaTrash, FaPlusCircle, FaAngleDown, FaAngleUp } from "react-icons/fa";
import Modal from "../Modal";
import AddCourse from "./AddCourse";
import { AdoContext } from "../../context/context";
import { updateClass } from "../../helpers/functions";

export default function ClassCourses({ cClass = {}, shown, changeShown }) {
  const keyName = "courses";
  const displayed = shown === keyName;
  const { courses, user, reloadContent } = React.useContext(UserContext);
  const { showAlert } = React.useContext(AdoContext);
  const handleRemoveClass = async (id) => {
    let tempCourses = cClass.courses.filter((item) => item !== id);
    let response = await updateClass(
      { courses: tempCourses },
      cClass._id,
      user.token
    );
    const { success, error } = response.data;
    if (success) {
      reloadContent();
      window.Toast.fire({
        title: "course successifully removed from " + cClass.name,
      });
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <div id="#courses" className="my-3">
      <h2
        onClick={() => {
          changeShown(keyName);
        }}
      >
        List of courses{" "}
        <span>
          {displayed ? (
            <FaAngleUp className="icon"></FaAngleUp>
          ) : (
            <FaAngleDown className="icon"></FaAngleDown>
          )}
        </span>
      </h2>
      {displayed && (
        <div className="row">
          {cClass.courses.map((item, index) => {
            let matchCourse = courses.find((record) => record._id === item);
            if (!matchCourse) return <div key={index}></div>;
            return (
              <div key={item} className="course-container col-6 col-md-4">
                <h2 className="mt-5">{matchCourse.name}</h2>
                {matchCourse.image ? (
                  <div className="img-container">
                    <img src={matchCourse.image} alt={matchCourse.name}></img>
                  </div>
                ) : (
                  <div></div>
                )}
                <button
                  className="action-btn mt-3"
                  onClick={() => {
                    handleRemoveClass(item);
                  }}
                >
                  <FaTrash className="btn-icon text-danger"></FaTrash>
                </button>
              </div>
            );
          })}
          {/* add a course to class */}
          <div className="col-6 col-md-4 addCourse my-5">
            <Modal
              opener={true}
              id="addCourse"
              header="Add Course"
              body={
                <AddCourse
                  id="addCourse"
                  classCourses={cClass.courses}
                  classId={cClass._id}
                ></AddCourse>
              }
            >
              <FaPlusCircle className="icon"></FaPlusCircle>
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
}
