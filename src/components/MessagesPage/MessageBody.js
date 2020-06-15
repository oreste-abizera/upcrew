import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

export default function MessageBody({ message = {}, me }) {
  const { getUserNames, users } = React.useContext(UserContext);
  const [to, setTo] = React.useState();
  const [from, setFrom] = React.useState();

  React.useEffect(() => {
    const tempTo = getUserNames(message.to);
    const tempFrom = getUserNames(message.from);
    setTo(tempTo);
    setFrom(tempFrom);
  }, [message, users]);

  return (
    <MessageBodyWrapper>
      <h5 className="font-weight-bolder">{message.subject || "no subject"}</h5>
      <hr></hr>
      <p className="text-left ml-4">
        <span className="main-text">From: </span>
        {from} {message.from === me && "(me)"}
      </p>
      <p className="text-left ml-4">
        <span className="main-text">To: </span>
        {to} {message.to === me && "(me)"}
      </p>
      <p className="text-left ml-4">
        <span className="main-text">Sent at: </span>
        {message.sentAt}
      </p>
      <p className="text-left text-muted ml-4 mt-5">{message.body}</p>

      <p className="text-right text-muted text-main">
        {message.status === "unread" && message.from === me && "Not seen"}
        {message.status === "read" && message.from === me && "seen"}
      </p>
    </MessageBodyWrapper>
  );
}

const MessageBodyWrapper = styled.div`
  padding: 2rem;
`;
