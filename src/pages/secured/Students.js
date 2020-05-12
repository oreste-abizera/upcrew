import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import StudentsList from "../../components/DashboardPage/sub-components/ListUsers/StudentsList";

export default function Students() {
  const { sidebarOpen } = React.useContext(UserContext);

  return (
    <StudentsWrapper sidebarOpen={sidebarOpen}>
      <StudentsList></StudentsList>
    </StudentsWrapper>
  );
}

const StudentsWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
