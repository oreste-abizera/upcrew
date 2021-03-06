import React from "react";
import { UserContext } from "../../context/UserContext";
import styled from "styled-components";
import HeadmasterDashboard from "../../components/DashboardPage/HeadmasterDashboard";
import StudentDashboard from "../../components/DashboardPage/StudentDashboard";
import ParentDashboard from "../../components/DashboardPage/ParentDashboard";
import TeacherDashboard from "../../components/DashboardPage/TeacherDashboard";

export default function Dashboard() {
  const { user, userLogout, sidebarOpen } = React.useContext(UserContext);
  const {
    user: { type },
  } = user;

  switch (type) {
    case "student":
      return (
        <DashboardWrapper sidebarOpen={sidebarOpen}>
          <StudentDashboard></StudentDashboard>
        </DashboardWrapper>
      );
    case "teacher":
      return (
        <DashboardWrapper sidebarOpen={sidebarOpen}>
          <TeacherDashboard></TeacherDashboard>
        </DashboardWrapper>
      );
    case "headmaster":
      return (
        <DashboardWrapper sidebarOpen={sidebarOpen}>
          <HeadmasterDashboard></HeadmasterDashboard>
        </DashboardWrapper>
      );
    case "parent":
      return (
        <DashboardWrapper sidebarOpen={sidebarOpen}>
          <ParentDashboard></ParentDashboard>
        </DashboardWrapper>
      );
    default:
      return (
        <DashboardWrapper sidebarOpen={sidebarOpen}>
          Hi {user.username}
          <button onClick={userLogout} className="btn btn-outline-danger">
            Logout
          </button>
        </DashboardWrapper>
      );
  }
}

const DashboardWrapper = styled.div`
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
