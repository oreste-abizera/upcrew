import React from "react";
import styled from "styled-components";

export default function Hero({ img, children }) {
  return <HeroWrapper img={img}>{children}</HeroWrapper>;
}

const HeroWrapper = styled.div`
  min-height: calc(100vh - 100px);
  background: url(${(props) => props.img}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;
