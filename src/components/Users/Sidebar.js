import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { AdoContext } from "../../context";
import { Link } from "react-router-dom";
import PagesLinks from "./PagesLinks";
import { url, defaultImg } from "../../helpers/url";

export default function Sidebar() {
  let {
    sidebarOpen,
    user: { user },
  } = React.useContext(UserContext);
  const { socialData } = React.useContext(AdoContext);
  return (
    <SidebarWrapper sidebarOpen={sidebarOpen}>
      <div className="sidebar-content">
        <div className="sidebar-profile text-center">
          <h2 className="names">{`${user.firstName} ${user.lastName}`}</h2>
          <h6 className="email text-muted">{user.userEmail}</h6>
          <img
            src={user.image ? `${url}/uploads/${user.image}` : defaultImg}
            alt={user.userName}
            className="img-thumbnail"
          ></img>
          <Link
            to="/profile"
            className="btn-block btn btn-outline-success ado-btn-outline mt-3"
          >
            View profile
          </Link>
        </div>
        <hr></hr>
        <PagesLinks userType={user.type} me={user.id}></PagesLinks>
      </div>
      <div className="sidebar-footer">
        {socialData.map((item) => (
          <a key={item.id} href={item.url} title={item.title} target="_new">
            {item.icon}
          </a>
        ))}
      </div>
    </SidebarWrapper>
  );
}

const SidebarWrapper = styled.nav`
  box-shadow: var(--primaryBoxShadow);
  transition: var(--mainTransition);
  background-color: var(--mainWhite);
  transform: ${(props) =>
    props.sidebarOpen === true ? "translate(0,0)" : "translateX(-100%)"};
  position: fixed;
  height: calc(100vh - 50px);
  width: 80%;
  padding: 1rem 0 1rem 1rem;
  z-index: 1;
  .sidebar-content {
    height: 94%;
    overflow-y: auto;
    padding-right: 1rem;
    margin-bottom: 2%;
  }
  .sidebar-footer {
    height: 6%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1rem 1rem 0;
    margin-bottom: 1rem;
  }
  .sidebar-footer a {
    /* background: var(--mainBlack); */
    background: var(--primaryColor);
    padding: 0.3rem;
    border-radius: 5px;
    transition: var(--mainTransition);
    margin-top: 1rem;
  }
  .sidebar-footer .icon {
    font-size: 1.3rem;
    color: var(--mainWhite);
    transition: var(--mainTransition);
  }
  .sidebar-footer a:hover .icon {
    /* color: var(--primaryColor); */
  }
  .sidebar-profile img {
    border-radius: 50%;
    max-width: 9rem;
  }
  @media screen and (min-width: 786px) {
    width: 25%;
  }
`;
