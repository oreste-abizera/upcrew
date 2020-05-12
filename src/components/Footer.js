import React from "react";
import styled from "styled-components";
import { AdoContext } from "../context";

export default function Footer() {
  const { socialData } = React.useContext(AdoContext);
  return (
    <FooterWrapper>
      <div className="container pt-3 pb-3 pb-md-0">
        <div className="row">
          <div className="footer-copyright col-10 col-md-6">
            <p className="text-capitalize">
              Copyright &copy; Upcrew School {new Date().getFullYear()}. All
              Rights reserved
            </p>
          </div>
          <div className="footer-icons col-10 col-md-6 d-flex justify-content-around">
            {socialData.map((item) => (
              <a href={item.url} key={item.id} target="_new" title={item.title}>
                {item.icon}
              </a>
           ))}
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  background-color: var(--darkGrey);
  color: var(--mainWhite);
  min-height: 44px;
  .icon{
      font-size: 1.5rem;
      color: var(--mainWhite);
      transition: var(--mainTransition);
  }
  .icon:hover{
      color: var(--primaryColor);
  }
`;
