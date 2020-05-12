import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import CourseListItem from "./CourseListItem";
import Heading from "../Heading";
import CoursesColumns from "./CoursesColumns";

export default function CoursesList() {
  const { classes } = React.useContext(UserContext);
  const [shown, setShown] = React.useState();
  const changeShown = (index) => {
    if (shown === index) {
      setShown(null);
    } else {
      setShown(index);
    }
  };
  return (
    <CoursesListWrapper>
      <Heading title="Courses list"></Heading>
      <CoursesColumns></CoursesColumns>
      {classes.map((item, index) => (
        <CourseListItem
          key={item.id}
          cClass={item}
          index={index}
          shown={shown}
          changeShown={changeShown}
        ></CourseListItem>
      ))}
    </CoursesListWrapper>
  );
}

const CoursesListWrapper = styled.div``;
