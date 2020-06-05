import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AdoContext } from "../../context";
import { MessagesContext } from "../../context/MessagesContext";
// import { UserContext } from "../../context/UserContext";

export default function PagesLinks({ userType, me }) {
  let { pageLinksData } = React.useContext(AdoContext);
  const { messages } = React.useContext(MessagesContext)
  let unreadMessages = messages.filter(record => record.to === me && record.status === "unread")
  if (userType) {
    pageLinksData = pageLinksData.filter(
      (item) => item.type === "all" || item.type.includes(userType)
    );
  } else {
    pageLinksData = pageLinksData.filter((item) => item.type === "all");
  }

  return (
    <PagesLinksWrapper>
      {pageLinksData.map((item) => (
        <NavLink
          key={item.id}
          to={item.url}
          className="sidebar-link"
          activeClassName="selected-link"
        >
          {item.icon} {item.text}
          {item.url === "/messages" && unreadMessages.length > 0 && (
            <span className="badge badge-success ml-2">
              {unreadMessages.length}
            </span>)}
        </NavLink>
      ))}
    </PagesLinksWrapper>
  );
}

const PagesLinksWrapper = styled.div`
  .sidebar-link {
    display: block;
    color: var(--mainBlack);
    margin-bottom: 0.5rem;
    padding: 0.5rem;
  }
  .sidebar-link:hover {
    background: var(--lightGrey);
  }
  .pagelink-icon {
    font-size: 1.3rem;
    color: var(--primaryColor);
    margin-right: 1rem;
  }
  .selected-link {
    background: var(--lightGrey);
    margin-left: 0.5rem;
    border-left: 2px solid var(--primaryColor);
  }
`;

PagesLinks.defaultProps = {
  userType: [],
};
