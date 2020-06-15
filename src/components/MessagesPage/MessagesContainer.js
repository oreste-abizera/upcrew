import React from "react";
import styled from "styled-components";
// import Heading from "../Heading"
import MessagesArea from "./MessagesArea";
import ChatList from "./ChatList";
import { MdMenu } from "react-icons/md";
import { MessagesContext } from "../../context/MessagesContext";
import { UserContext } from "../../context/UserContext";

export default function MessagesContainer() {
  const { user } = React.useContext(UserContext);
  const {
    activeMessage,
    syncActiveMessageToSessionStorage,
    messages,
  } = React.useContext(MessagesContext);
  const [sideOpen, setSideOpen] = React.useState(true);
  const closeSide = () => {
    setSideOpen(false);
  };
  const openSide = () => {
    setSideOpen(true);
  };

  return (
    <MessagesContainerWrapper sideOpen={sideOpen}>
      <div>
        {/* <Heading title="Private Messaging"></Heading> */}
        <div className="messages-data d-flex">
          <div className="open-side">
            <MdMenu onClick={openSide} className="open-icon"></MdMenu>
          </div>
          <ChatList
            closeSide={closeSide}
            syncActiveMessageToSessionStorage={
              syncActiveMessageToSessionStorage
            }
          ></ChatList>
          <MessagesArea
            activeMessage={activeMessage}
            messages={messages}
            me={user.user.id}
          ></MessagesArea>
        </div>
      </div>
    </MessagesContainerWrapper>
  );
}

const MessagesContainerWrapper = styled.div`
  /* padding-bottom: 1rem; */
  .append {
    cursor: pointer;
  }
  .close-btn {
    position: absolute;
    color: var(--mainWhite);
    font-size: 1.5rem;
    right: 0rem;
    cursor: pointer;
  }
  .messages-list {
    min-width: ${(props) => (props.sideOpen ? "50%" : "0")};
    max-width: ${(props) => (props.sideOpen ? "50%" : "0")};
    box-shadow: var(--primaryBoxShadow);
    min-height: 89.1vh;
    max-height: 89.1vh;
    background: #343a40;
    overflow: auto;
    position: relative;
  }
  .profile-section .userName {
    color: var(--mainWhite);
  }
  .profile-section {
    padding: 1rem;
  }
  .profile-logo {
    color: var(--mainWhite);
    font-weight: 700;
  }
  .profile-icon {
    font-size: 2rem;
    margin-top: -0.3rem;
    cursor: pointer;
  }
  .chat-list {
    padding: 0 1rem;
  }

  .messages-area {
    min-width: ${(props) => (props.sideOpen ? "50%" : "90%")};
    max-width: ${(props) => (props.sideOpen ? "50%" : "90%")};
    min-height: 89.1vh;
    max-height: 89.1vh;
    background: var(--mainWhite);
    overflow-y: auto;
  }
  .messages-header {
    color: var(--mainWhite);
  }
  .mail-icon {
    font-size: 6rem;
    margin-top: 15%;
    color: var(--primaryColor);
  }
  .open-side {
    min-width: ${(props) => (props.sideOpen ? "0" : "10%")};
    max-width: ${(props) => (props.sideOpen ? "0" : "10%")};
    text-align: center;
  }
  .open-icon {
    font-size: 1.7rem;
    text-align: center;
    cursor: pointer;
    color: var(--primaryColor);
  }

  @media screen and (min-height: 500px) {
    .messages-list,
    .messages-area {
      min-height: 92vh;
    }
  }
  @media screen and (min-width: 576px) {
    .messages-list {
      min-width: ${(props) => (props.sideOpen ? "30%" : "0")};
      max-width: ${(props) => (props.sideOpen ? "30%" : "0")};
    }
    .messages-area {
      min-width: ${(props) => (props.sideOpen ? "70%" : "90%")};
      max-width: ${(props) => (props.sideOpen ? "70%" : "90%")};
      background: var(--mainWhite);
    }
  }
`;
