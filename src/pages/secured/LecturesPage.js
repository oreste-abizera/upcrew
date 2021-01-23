import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { MessagesContext } from "../../context/MessagesContext";

export default function LecturesPage() {
  const { sidebarOpen } = React.useContext(UserContext);
  const { lectures } = React.useContext(MessagesContext);
  return (
    <LecturesPageWrapper sidebarOpen={sidebarOpen}>
      hello from Lectures page {lectures.length}
    </LecturesPageWrapper>
  );
}

const LecturesPageWrapper = styled.div`
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
