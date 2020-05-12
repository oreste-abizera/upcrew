import React from "react";
import styled from "styled-components";
import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import { Redirect } from "react-router-dom";

export default function AccessDenied() {
  return (
    <AccessDeniedWrapper>
      <Redirect to="/dashboard"></Redirect>
      <Hero>
        <Banner title="403" subtitle="Access Denied">
          <Link to="/" className="ado-btn my-4">
            Return to Home
          </Link>
        </Banner>
      </Hero>
    </AccessDeniedWrapper>
  );
}

const AccessDeniedWrapper = styled.div``;
