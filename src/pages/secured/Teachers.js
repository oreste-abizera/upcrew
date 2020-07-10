import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import TeachersList from "../../components/DashboardPage/sub-components/ListUsers/TeachersList";

export default function Teachers() {
  const { sidebarOpen } = React.useContext(UserContext);
  return (
    <TeachersWrapper sidebarOpen={sidebarOpen}>
      <TeachersList></TeachersList>
    </TeachersWrapper>
  );
}

const TeachersWrapper = styled.div`
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
