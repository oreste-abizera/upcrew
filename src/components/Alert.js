import React from "react";
import styled from "styled-components";
import { FaWindowClose } from "react-icons/fa";
import { AdoContext } from "../context";

export default function Alert() {
  const { hideAlert } = React.useContext(AdoContext);
  const { type, message, show } = React.useContext(AdoContext).alert;
  let css = "alert-container";
  if (type === "danger") {
    css += " alert-danger";
  } else {
    css += " alert-success";
  }
  if (show) {
    css += " alert-show";
  }
  return (
    <AlertWrapper>
      <div className="container">
        <div className="row">
          <div className={`col-6 mx-auto py-5 pl-3 ${css}`}>
            <p className="alert-footer">{message}</p>
            <FaWindowClose
              className="alert-icon"
              onClick={hideAlert}
            ></FaWindowClose>
          </div>
        </div>
      </div>
    </AlertWrapper>
  );
}

const AlertWrapper = styled.div`
  position: fixed;
  min-width: 40rem;
  top: 20%;
  right: -10%;
  z-index: 5;
  .alert-container {
    display: none;
  }
  .alert-show {
    display: block;
  }
  .alert-success {
    background: var(--primaryColor);
  }
  .alert-danger {
    background: var(--mainRed);
  }
  .alert-container p {
    color: white;
  }
  .alert-container {
    position: relative;
  }
  .alert-icon {
    font-size: 1.5rem;
    position: absolute;
    top: 0.2rem;
    right: 0.2rem;
    cursor: pointer;
  }
  .alert-icon:hover {
    background: var(--darkGrey);
  }
  @media screen and (min-width: 576px) {
    .alert-container {
      right: 85%;
    }
  }
`;
