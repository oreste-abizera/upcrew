import React from "react";
import styled from "styled-components";
import LoginForm from "../components/Login&RegisterPages/LoginForm";

export default function LoginPage({ history }) {

  return (
    <LoginWrapper>
      <LoginForm></LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  height: calc(100vh - 63px);
  margin-top: 5rem !important;
  .login-form {
    /* margin-top: 9rem !important; */
    background: var(--mainWhite);
    box-shadow: var(--primaryBoxShadow);
  }
  .input-group {
    margin: 2rem 0;
  }
  .input-group-text {
    background: var(--primaryColor);
  }
  input[type="submit"] {
    background: var(--primaryColor);
    color: #ffffff;
    letter-spacing: 0.3rem;
  }
  .error {
    color: red !important;
  }
  .success {
    color: var(--primaryColor) !important;
  }
  @media screen and (max-height: 460px) {
    margin-bottom: 9rem;
  }
  @media screen and (max-height: 310px) {
    margin-bottom: 20rem;
  }
`;
