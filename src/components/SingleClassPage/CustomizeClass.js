import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import Modal from "../Modal";
import AddCourse from "./AddCourse";
import { AdoContext } from "../../context/context";
import { updateClass } from "../../helpers/functions";

export default function CustomizeClass({ cClass = [] }) {
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
        title: "course successifully removed from" + cClass.name,
      });
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <CustomizeClassWrapper>
      <div id="#courses" className="col-10 col-md-8 mx-auto text-center">
        <h1 className="main-text my-4" style={{ border: "none" }}>
          {cClass.name}
        </h1>
        <h2>List of courses</h2>
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
      </div>
    </CustomizeClassWrapper>
  );
}

const CustomizeClassWrapper = styled.div`
  .img-container img {
    max-height: 5rem;
  }
  .addCourse {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .addCourse .icon {
    font-size: 1.8rem;
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
