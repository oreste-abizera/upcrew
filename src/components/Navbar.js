import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdMenu, MdClose, MdArrowForward } from "react-icons/md";
import logo from "../assets/images/logo.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };
  return (
    <NavbarWrapper>
      <Link to="/">
        <img src={logo} alt="upcrew logo" className="nav-image"></img>
      </Link>
      <div className={isOpen ? "links" : "links hide-nav"}>
        <div className="left-links">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/developers">Developers</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li>
              <Link to="/contact">Contact us</Link>
            </li>
          </ul>
        </div>
        <div className="right-links">
          <ul className="nav-links">
            <li>
              <Link to="/support">Support</Link>
            </li>
            <li>
              <Link to="/login">
                Login<MdArrowForward></MdArrowForward>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-icon-container">
        {isOpen ? (
          <MdClose className="nav-icon" onClick={toggleNav}></MdClose>
        ) : (
          <MdMenu className="nav-icon" onClick={toggleNav}></MdMenu>
        )}
      </div>
    </NavbarWrapper>
  );
}

const NavbarWrapper = styled.nav`
  background: var(--mainWhite);
  box-shadow: var(--primaryBoxShadow);
  /* position: sticky; */
  top: 0;
  width: 100% !important;
  right: 0;
  left: 0;
  z-index: 1;
  .hide-nav {
    display: none;
  }
  .nav-image {
    padding: 1rem 1.5rem;
  }
  .nav-icon-container {
    position: absolute;
    top: 0;
    right: 1rem;
  }
  .nav-icon {
    font-size: 2.5rem;
    color: var(--primaryColor);
    cursor: pointer;
  }
  li {
    letter-spacing: var(--mainSpacing);
    padding: 0.5rem 0;
    margin-left: 2rem;
  }
  .nav-links a {
    text-decoration: none;
    color: var(--primaryColor);
    outline: none;
  }
  .right-links {
    margin-top: -1rem;
  }
  @media screen and (min-width: 576px) {
    display: grid;
    grid-template-columns: 1fr 7fr;
    .nav-icon-container {
      display: none;
    }
    .hide-nav {
      display: block;
    }
    .links {
      display: flex;
      padding-top: 1rem;
      align-items: center;
      justify-content: space-between;
      margin-left: 2rem;
    }
    .right-links {
      padding: 1rem 0 0 0;
    }
    ul {
      display: flex;
      justify-content: space-between;
    }
    li {
      padding: 0 1.5rem;
    }
  }
`;
