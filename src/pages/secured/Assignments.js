import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import AssignmentsList from "../../components/AssignmentsPage/AssignmentsList";

export default function Assignments() {
  const { sidebarOpen } = React.useContext(UserContext);
  return (
    <AssignmentsWrapper sidebarOpen={sidebarOpen}>
      <AssignmentsList></AssignmentsList>
    </AssignmentsWrapper>
  );
}

const AssignmentsWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
