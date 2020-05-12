import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import CoursesList from "../../components/CoursesPage/CoursesList";

export default function Courses() {
  const { sidebarOpen } = React.useContext(UserContext);
  return (
    <CoursesWrapper sidebarOpen={sidebarOpen}>
      <CoursesList></CoursesList>
    </CoursesWrapper>
  );
}

const CoursesWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
