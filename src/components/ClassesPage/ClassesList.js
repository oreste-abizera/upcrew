import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import Heading from "../Heading";
import DisplayClass from "./DisplayClass";
import ClassesFilters from "./ClassesFilters";

export default function ClassesList() {
  const { filteredClasses } = React.useContext(UserContext);
  let classes = [...filteredClasses];
  // if (user.user.type === "teacher") {
  //   classes = classes.filter((item) => item.classTeacher === user.user._id);
  // }

  return (
    <ClassesListWrapper>
      <Heading title="Classes list"></Heading>
      <ClassesFilters></ClassesFilters>
      <p className="text-center">{classes.length} results found.</p>
      <div className="row">
        {classes.map((record) => (
          <DisplayClass currentClass={record} key={record._id}></DisplayClass>
        ))}
      </div>
    </ClassesListWrapper>
  );
}

const ClassesListWrapper = styled.div``;
