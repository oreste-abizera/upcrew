import React from "react";
import styled from "styled-components";
import RegisterForm from "../components/Login&RegisterPages/RegisterForm";

export default function RegisterPage() {

  return (
    <RegisterWrapper>
      <RegisterForm></RegisterForm>
    </RegisterWrapper>
  );
}

const RegisterWrapper = styled.div`
  min-height: calc(100vh - 63px);
  /* background: var(--mainGrey); */
  .register-form {
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
  input[type="checkbox"] {
    margin-left: 0.5rem;
  }
  .error {
    color: red !important;
  }
  .success {
    color: var(--primaryColor) !important;
  }
`;
