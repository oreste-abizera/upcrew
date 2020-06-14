import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import ListQuizInfo from "../../components/ViewQuizPage/ListQuizInfo";
import Loader from "../../components/Loader";
import ErrorPage from "../ErrorPage";

export default function ViewQuizPage(props) {
  const { id } = props.match.params;
  const { sidebarOpen, user } = React.useContext(UserContext);
  const { assignments } = React.useContext(AssignmentsContext);
  const found = assignments.find((record) => record._id === id);

  if (!found) {
    return (
      <ViewQuizPageWrapper sidebarOpen={sidebarOpen}>
        <Loader text="Quiz info loading..."></Loader>
      </ViewQuizPageWrapper>
    );
  }

  if (found.teacher !== user.user._id) {
    return <ErrorPage></ErrorPage>;
  }
  return (
    <ViewQuizPageWrapper sidebarOpen={sidebarOpen}>
      <ListQuizInfo id={id}></ListQuizInfo>
    </ViewQuizPageWrapper>
  );
}

const ViewQuizPageWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
