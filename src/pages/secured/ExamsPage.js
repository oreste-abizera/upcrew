import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function ExamsPage() {
  const { sidebarOpen } = React.useContext(UserContext);
  return (
    <ExamsPageWrapper sidebarOpen={sidebarOpen}>
      <p className="text-center my-3">
        No exams available right now. You will be notified when they arrive.
      </p>
      <Link to="/dashboard" className="ado-btn">
        Return to home
      </Link>
    </ExamsPageWrapper>
  );
}

const ExamsPageWrapper = styled.div`
  text-align: center;
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
