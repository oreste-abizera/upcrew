import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import MessagesContainer from "../../components/MessagesPage/MessagesContainer";

export default function MessagesPage() {
  const { sidebarOpen, closeSidebar } = React.useContext(UserContext);
  React.useEffect(() => {
    closeSidebar();
  }, []);

  return (
    <MessagesPageWrapper sidebarOpen={sidebarOpen}>
      <MessagesContainer></MessagesContainer>
    </MessagesPageWrapper>
  );
}

const MessagesPageWrapper = styled.div`
/* @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "25%" : "0")};
  } */
  `;
