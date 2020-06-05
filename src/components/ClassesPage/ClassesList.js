import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import ClassListItem from "./ClassListItem";
import Heading from "../Heading";
import ClassesColumns from "./ClassesColumns";

export default function ClassesList() {
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
    <ClassesListWrapper>
      <Heading title="Classes list"></Heading>
      <ClassesColumns></ClassesColumns>
      {classes.map((item, index) => (
        <ClassListItem
          key={item.id}
          cClass={item}
          index={index}
          shown={shown}
          changeShown={changeShown}
        ></ClassListItem>
      ))}
    </ClassesListWrapper>
  );
}

const ClassesListWrapper = styled.div``;
