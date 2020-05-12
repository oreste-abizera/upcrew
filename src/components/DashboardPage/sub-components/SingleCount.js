import React from "react";
import styled from "styled-components";

export default function SingleCount({ title, subtitle, number, icon, bg }) {
  return (
    <CountWrapper bg={bg}>
      <div className="count-left">
        <div className="count-number">{number}</div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="count-right">
        <div className="count-icon-container">{icon}</div>
      </div>
    </CountWrapper>
  );
}

const CountWrapper = styled.div`
  background: ${(props) =>
    props.bg === "red"
      ? "#f56954"
      : props.bg === "green"
      ? "#00a65a"
      : props.bg === "aqua"
      ? "#00c0ef"
      : "#0073b7"};
  padding: 1rem 2rem 2.5rem 2rem;
  border-radius: 0.3rem;
  color: var(--mainWhite);
  position: relative;
  .count-number {
    font-size: 3rem;
  }
  .count-icon-container {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .count-icon {
    font-size: 8rem;
    color: rgba(0, 0, 0, 0.1);
    z-index: 0;
    margin-bottom: -1rem;
  }
`;
