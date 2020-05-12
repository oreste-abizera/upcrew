import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AdoContext } from "../../context";
// import { UserContext } from "../../context/UserContext";

export default function PagesLinks({ userType }) {
  let { pageLinksData } = React.useContext(AdoContext);
  // const {
  //   user: {
  //     user: { type },
  //   },
  // } = React.useContext(UserContext);
  if (userType.title) {
    pageLinksData = pageLinksData.filter(
      (item) => item.type === "all" || item.type === userType.title
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
