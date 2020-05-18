import React from "react";
import styled from "styled-components";

export default function Title({ title, center }) {
  return (
    <TitleWrapper center={center}>
      <h3 className="title">{title}</h3>
      <div className="title-underline"></div>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div`
  .title {
    color: var(--primaryColor);
    text-align: ${(props) => (props.center ? "center" : "left")};
    letter-spacing: var(--mainSpacing);
  }
  .title-underline {
    margin: ${(props) => (props.center ? "0 auto" : "0")};
  }
`;
