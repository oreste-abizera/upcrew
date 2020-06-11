import React from "react";
import styled from "styled-components";

export default function Banner({ title, subtitle, children, img }) {
  return (
    <BannerWrapper>
      <h1 className="text-center">{title}</h1>
      <h6 className="text-center mt-4">{subtitle}</h6>
      {children}
      {img && <img className="banner-img" src={img} alt=""></img>}
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  .banner-img {
    position: absolute;
    top: -10rem;
    left: -5rem;
    width: 190%;
    height: 300%;
    z-index: -1;
  }

  @media screen and (min-width: 786px) {
    .banner-img {
      top: -11rem;
      left: -20rem;
      width: 50rem;
      height: 270%;
    }
  }
`;
