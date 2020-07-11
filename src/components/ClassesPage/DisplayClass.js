import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { AdoContext } from "../../context/context";
import { Link } from "react-router-dom";
import { FaCaretLeft, FaCaretRight, FaTrash, FaEdit } from "react-icons/fa";
import { UpdateMyDetails, deleteClass } from "../../helpers/functions";
import Modal from "../Modal";
import CreateClass from "./CreateClass";

export default function DisplayClass({ currentClass = {} }) {
  const {
    sidebarOpen,
    courses,
    reloadContent,
    users,
    user: { user },
    user: me,
    getUserNames,
  } = React.useContext(UserContext);
  const { showAlert } = React.useContext(AdoContext);
  const [classCourses, setClassCourses] = React.useState([]);
  const [displayCourse, setDisplayCourse] = React.useState({});
  const [classStudents, setClassStudents] = React.useState([]);
  const [iteration, setIteration] = React.useState(0);

  React.useEffect(() => {
    let { courses: tempClassCourses = [] } = currentClass;
    tempClassCourses = tempClassCourses.map((record) => {
      let courseData = courses.find((item) => item._id === record);
      return courseData;
    });
    setClassCourses(tempClassCourses);
    if (tempClassCourses[0]) {
      setDisplayCourse(tempClassCourses[0]);
      setIteration(0);
    }

    let tempClassStudents = users.filter((record) => {
      if (record.currentClass) {
        return record.currentClass.toString() === currentClass._id.toString();
      }
      return false;
    });
    setClassStudents(tempClassStudents);
  }, [currentClass, courses, users]);

  const nextCourse = () => {
    if (iteration < classCourses.length - 1) {
      setIteration(iteration + 1);
      setDisplayCourse(classCourses[iteration + 1]);
    }
  };

  const previousCourse = () => {
    if (iteration > 0) {
      setIteration(iteration - 1);
      setDisplayCourse(classCourses[iteration - 1]);
    }
  };
  const joinClass = async () => {
    let response = await UpdateMyDetails(
      { currentClass: currentClass._id },
      me.token
    );
    const { success, error } = response.data;
    if (success) {
      reloadContent();
      window.Toast.fire({
        title: `you successifully joined ${currentClass.name}`,
      });
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };

  const leaveClass = async () => {
    let response = await UpdateMyDetails({ currentClass: null }, me.token);
    const { success, error } = response.data;
    if (success) {
      reloadContent();
      window.Toast.fire({
        title: `you successifully left ${currentClass.name}`,
      });
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };

  const handleDeleteClass = async () => {
    let response = await deleteClass(currentClass._id, me.token);
    let { success, error } = response.data;
    if (success) {
      window.Toast.fire({
        title: `class successifully deleted`,
      });
      reloadContent();
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <div
      className={
        sidebarOpen
          ? "col-10 col-md-6 mt-5 mx-auto"
          : "col-10 col-md-5 mt-5 mx-auto"
      }
    >
      <DisplayClassWrapper>
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h5 className="panel-title">{currentClass.name}</h5>
          </div>
          <div className="panel-body row mx-auto">
            <div className="col-10 col-lg-5 d-flex">
              {/* {iteration > 0 && ( */}
              <div className="course-icon col-1">
                <FaCaretLeft onClick={previousCourse}></FaCaretLeft>
              </div>
              {/* )} */}
              <div className="course-list col-10 ml-3">
                <div className="text-center">
                  <h6 className="text-center course-name">
                    {displayCourse.name}
                  </h6>
                  {displayCourse.image ? (
                    <img
                      className="img-fluid course-img"
                      src={displayCourse.image}
                      alt={displayCourse.name}
                    ></img>
                  ) : (
                    <div className="img-alt">course image not available</div>
                  )}
                  {classCourses.length > 0 && (
                    <p>
                      course {iteration + 1} of {classCourses.length}
                    </p>
                  )}
                </div>
              </div>
              {/* {iteration < classCourses.length && ( */}
              <div className="course-icon col-1">
                <FaCaretRight onClick={nextCourse}></FaCaretRight>
              </div>
              {/* )} */}
            </div>
            <div className="col-10 col-lg-5 mx-auto">
              <div className="class-data">
                <div>
                  <h6>Students</h6>
                  <p>{classStudents.length} students</p>
                </div>

                <div>
                  <h6>Courses</h6>
                  <p>{classCourses.length} courses</p>
                </div>

                <div>
                  <h6>Projects</h6>
                  <p>10 projects</p>
                </div>
              </div>
            </div>
          </div>
          {currentClass.classTeacher && (
            <p className="ml-5 text-main">
              Teacher: {getUserNames(currentClass.classTeacher)}
            </p>
          )}
          <div className="panel-footer pl-4">
            {user.type === "student" && user.currentClass === currentClass._id && (
              <button className="btn" onClick={leaveClass}>
                Joined
              </button>
            )}
            {user.type === "student" && user.currentClass !== currentClass._id && (
              <button className="btn btn-success" onClick={joinClass}>
                Join
              </button>
            )}
            {user.type === "teacher" && user._id === currentClass.classTeacher && (
              <div className="row">
                <Link to={`/myClasses/${currentClass._id}`}>
                  Customize class
                </Link>
                <Modal
                  opener={true}
                  header="Edit Class"
                  body={
                    <CreateClass
                      edit={true}
                      id={`editClass${currentClass._id}`}
                      currentClass={currentClass}
                    ></CreateClass>
                  }
                  id={`editClass${currentClass._id}`}
                >
                  <button className="action-btn">
                    <FaEdit className="btn-icon main-text"></FaEdit>
                  </button>
                </Modal>

                <button className="action-btn" onClick={handleDeleteClass}>
                  <FaTrash className="btn-icon text-danger"></FaTrash>
                </button>
              </div>
            )}
          </div>
        </div>
      </DisplayClassWrapper>
    </div>
  );
}

const DisplayClassWrapper = styled.div`
  .icon {
    cursor: pointer;
  }
  .panel {
    border-color: var(--primaryColor);
  }

  .panel-heading {
    background-color: var(--primaryColor);
    border-color: var(--primaryColor);
  }

  .course-list {
    /* background: var(--lightGrey); */
    padding: 0.3rem 0.6rem;
    margin-top: 2rem;
  }

  .course-name {
    /* font-size: 0.9rem; */
  }

  .img-alt {
    min-height: 8rem;
    display: flex;
    align-items: center;
  }
  .course-img {
    max-width: 7rem;
    min-height: 7rem;
    max-height: 7rem;
  }

  .class-data h6 {
    font-weight: bolder;
  }
  .course-icon {
    /* display: flex; */
    /* align-items: center; */
    font-size: 1.5rem;
    margin-top: 50%;
    cursor: pointer;
  }
`;
