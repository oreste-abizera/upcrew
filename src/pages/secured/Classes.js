import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import ClassesList from "../../components/ClassesPage/ClassesList";

export default function Classes() {
  const { sidebarOpen } = React.useContext(UserContext);
  return (
    <ClassesWrapper sidebarOpen={sidebarOpen}>
      <ClassesList></ClassesList>
    </ClassesWrapper>
  );
}

const ClassesWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
