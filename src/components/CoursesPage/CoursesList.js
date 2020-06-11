import React from "react";
import styled from "styled-components";
import Heading from "../Heading";
import Loader from "../Loader";
import CoursesListItem from "./CoursesListItem";
import { UserContext } from "../../context/UserContext";
import { AdoContext } from "../../context/context";
import { FaPlusCircle } from "react-icons/fa";
import Modal from "../Modal";
import EditCourse from "./EditCourse";

export default function CoursesList({ courses = [] }) {
  const { user: me, reloadContent, sidebarOpen } = React.useContext(
    UserContext
  );
  const { showAlert } = React.useContext(AdoContext);
  return (
    <CoursesListWrapper>
      <div className="container">
        <Heading title="Courses list"></Heading>
        {courses.length === 0 && <Loader text="Courses loading"></Loader>}
        <div className="row mx-auto p-3">
          {/* CREATE NEW COURSE */}
          <div
            className={
              sidebarOpen
                ? "text-center col-10 col-md-4 col-lg-4"
                : "text-center col-10 col-md-4 col-lg-3"
            }
          >
            <div className="text-center col-12 m-3 p-3 create-container">
              <Modal
                id={`createcourse`}
                header="Create Course"
                opener={true}
                body={
                  <EditCourse
                    edit={false}
                    id="createcourse"
                    showAlert={showAlert}
                    reloadContent={reloadContent}
                    me={me}
                  ></EditCourse>
                }
              >
                <FaPlusCircle className="create-course-icon"></FaPlusCircle>
              </Modal>
            </div>
          </div>

          {/* list courses */}
          {courses.map((item) => (
            <CoursesListItem
              key={item._id}
              course={item}
              me={me}
              showAlert={showAlert}
              reloadContent={reloadContent}
              sidebarOpen={sidebarOpen}
            ></CoursesListItem>
          ))}
        </div>
      </div>
    </CoursesListWrapper>
  );
}

const CoursesListWrapper = styled.div`
  .create-container {
    background: var(--mainWhite);
    box-shadow: var(--primaryBoxShadow);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90%;
  }
  .course-container {
    background: var(--mainWhite);
    box-shadow: var(--primaryBoxShadow);
    min-height: 90%;
  }
  .course-container:hover,
  .create-container:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  .course-container .img-container {
    min-height: 10rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .course-container h2 {
    font-weight: 900;
    min-height: 5rem;
  }
  .course-container img {
    max-height: 10rem;
  }
  .create-course-icon {
    font-size: 2rem;
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
