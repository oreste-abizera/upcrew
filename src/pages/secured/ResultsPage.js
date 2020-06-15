import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import ResultsList from "../../components/ResultsPage/ResultsList";

export default function ResultsPage() {
  const { sidebarOpen } = React.useContext(UserContext);
  return (
    <ResultsPageWrapper sidebarOpen={sidebarOpen}>
      <ResultsList></ResultsList>
    </ResultsPageWrapper>
  );
}

const ResultsPageWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
