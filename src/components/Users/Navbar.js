import React from "react";
import styled from "styled-components";
import { MdMenu, MdSettings, MdHelpOutline } from "react-icons/md";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { userLogout, toggleSidebar } = React.useContext(UserContext);
  const [showPopUp, setShowPopUp] = React.useState(false);
  const togglePopUp = () => {
    setShowPopUp(!showPopUp);
  };
  return (
    <NavbarWrapper showPopUp={showPopUp}>
      <div className="left-nav">
        <MdMenu className="nav-icon" onClick={toggleSidebar}></MdMenu>
        <Link to="/dashboard">
          <h6>UPCREW</h6>
        </Link>
      </div>
      <div className="right-nav">
        <div>
          <Link to="/profile">
            <MdSettings className="nav-icon"></MdSettings>
          </Link>
        </div>
        <div>
          <Link to="/help">
            <MdHelpOutline className="nav-icon"></MdHelpOutline>
          </Link>
        </div>
        <div>
          <FaUser className="nav-icon sign-out" onClick={togglePopUp}></FaUser>
          <div className="nav-pop-up sign-out-pop-up" onClick={userLogout}>
            <FaSignOutAlt className="pop-up-icon"></FaSignOutAlt>
            Logout
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  background: var(--primaryColor);
  padding: 0.3rem 1rem;
  color: var(--mainWhite);
  min-height: 50px;
  max-height: 50px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;

  .right-nav,
  .left-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-icon {
    color: var(--mainWhite);
    margin: 0 1rem;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .left-nav h6 {
    margin-top: 0.5rem;
  }
  .nav-pop-up {
    box-shadow: var(--primaryBoxShadow);
    position: absolute;
    background: var(--mainWhite);
    bottom: -2rem;
    right: 0.5rem;
    color: var(--mainBlack);
    padding: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    display: ${(props) => (props.showPopUp === true ? "block" : "none")};
  }
  .pop-up-icon {
    font-size: 1rem;
    margin-right: 0.4rem;
    color: var(--primaryColor);
  }
  .left-nav a {
    color: var(--mainWhite);
  }
  @media screen and (min-width: 576px) {
  }
`;
