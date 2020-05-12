import React from "react";
import styled from "styled-components";
import { FaAngleDoubleUp } from "react-icons/fa";
import { AdoContext } from "../context";

export const ScrollButton = () => {
  const { height } = React.useContext(AdoContext);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <ScrollButtonWrapper
      onClick={scrollToTop}
      show={height > 100 ? "true" : "false"}
    >
      <FaAngleDoubleUp className="btn-icon"></FaAngleDoubleUp>
    </ScrollButtonWrapper>
  );
};

const ScrollButtonWrapper = styled.button`
  display: ${(props) => (props.show === "true" ? "block" : "none")};
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 0.2rem;
  background: transparent;
  border: none;
  outline: none;
  .btn-icon {
    font-size: 1.4rem;
    color: var(--primaryColor);
  }
`;
