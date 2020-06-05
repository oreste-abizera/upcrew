import React, { Component } from "react";
import { FaEye, FaBus } from "react-icons/fa";
import { MdForward30, MdHelp } from "react-icons/md";
import styled from "styled-components";
import Title from "../Title";

export default class Services extends Component {
  state = {
    servicesData: [
      {
        id: 1,
        icon: <FaBus className="services-icon mx-auto"></FaBus>,
        title: "Bus To Success",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur numquam recusandae quaerat ratione, iste ea modi doloremque ducimus odit corporis.",
      },
      {
        id: 2,
        icon: <FaEye className="services-icon mx-auto"></FaEye>,
        title: "Clear Vision",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur numquam recusandae quaerat ratione, iste ea modi doloremque ducimus odit corporis.",
      },
      {
        id: 3,
        icon: <MdForward30 className="services-icon mx-auto"></MdForward30>,
        title: "Looking Forward",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur numquam recusandae quaerat ratione, iste ea modi doloremque ducimus odit corporis.",
      },
      {
        id: 4,
        icon: <MdHelp className="services-icon mx-auto"></MdHelp>,
        title: "Your Supporter",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur numquam recusandae quaerat ratione, iste ea modi doloremque ducimus odit corporis.",
      },
    ],
  };
  render() {
    return (
      <ServicesWrapper>
        <Title center="true" title="Our Mission"></Title>
        <div className="container">
          <div className="row">
            {this.state.servicesData.map((item) => (
              <div
                key={item.id}
                className="col-10 col-sm-8 col-md-6 col-lg-4 mx-auto pb-4 pt-5"
              >
                <div className="icon-div">{item.icon}</div>
                <h3>{item.title}</h3>
                <p className="text-muted text-center">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ServicesWrapper>
    );
  }
}

const ServicesWrapper = styled.div`
margin-top: 3rem;
  background: var(--test);
  .services-icon {
    display: block;
    text-align: center;
    font-size: 4rem;
    margin-bottom: 1rem;
    color: var(--primaryColor);
  }
`;
