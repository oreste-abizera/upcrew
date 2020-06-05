import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import CoursesList from "../../components/CoursesPage/CoursesList";

export default function CoursesPage() {
  const { sidebarOpen, courses } = React.useContext(UserContext);
  return (
    <CoursesPageWrapper sidebarOpen={sidebarOpen}>
      <CoursesList courses={courses}></CoursesList>
    </CoursesPageWrapper>
  );
}

const CoursesPageWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
