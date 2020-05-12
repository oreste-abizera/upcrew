import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AdoContext } from "../../context";
import { MdStar } from "react-icons/md";

export default function Hero({ children }) {
  const { updatesData } = React.useContext(AdoContext);
  return (
    <HeroWrapper>
      <div className="container">
        <div className="row">
          <div className="hero-info col-10 col-sm-8 col-md-6 px-md-5 py-5 mx-auto">
            <h2>"Help us to help you."</h2>
            <p>
              Upcrew is a project based site. Simply it is a school management
              system aiming to change education to smart education. We are in
              the beginning of this project. Contact us for more info or for any
              enquiry. Doors are open for anyone with the idea or improvement in
              our project.
            </p>
            <Link to="/register" className="ado-btn">
              Get Started
            </Link>
            <Link to="/developers" className="ado-btn btn-white">
              Developers
            </Link>
          </div>
          <div className="notebook-container col-10 col-sm-8 col-md-6 mx-auto mb-1">
            <section className="notebook">
              <h1>Updates</h1>
              <ul className="updates-list">
                {updatesData.map((item) => (
                  <li key={item.id}>
                    {item.text}
                    {item.status === "important" && (
                      <MdStar className="updates-icon"></MdStar>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.div`
  min-height: calc(100vh - 63px);
  background: var(--primaryBg);

  .hero-info h2 {
    letter-spacing: var(--mainSpacing);
    color: #ffffff;
    padding: 1rem 0;
  }
  p {
    color: #ffffff;
  }
  .notebook {
    min-width: 80%;
    min-height: 9rem;
    background: #ffffff;
    padding: 1rem;
  }
  .updates-icon {
    margin-left: 0.2rem;
    font-size: 1.4rem;
    color: var(--primaryColor);
  }
  @media screen and (min-width: 576px) {
    .hero-info {
      padding-top: 10rem !important;
    }
    .notebook-container {
      padding-top: 1rem !important;
    }
    .notebook {
      margin: 30% auto;
      padding: 1rem;
      min-height: 15rem;
    }
  }
`;
