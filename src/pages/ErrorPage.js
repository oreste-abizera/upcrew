import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import contentImage from "../assets/images/content.svg";
import { UserContext } from "../context/UserContext";

export default function ErrorPage() {
  const { sidebarOpen, user } = React.useContext(UserContext);
  return (
    <ErrorWrapper sidebarOpen={!user.token ? false : sidebarOpen}>
      <Hero>
        <Banner title="404" subtitle="Page Not Found" img={contentImage}>
          <Link to="/" className="ado-btn my-4">
            Return to Home
          </Link>
        </Banner>
      </Hero>
    </ErrorWrapper>
  );
}

const ErrorWrapper = styled.div`
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
