import React, { Component } from "react";
import styled from "styled-components";
import Title from "../Title";
import { FaFacebook, FaGithub, FaYoutube, FaGlobe, FaTwitter, FaLinkedin, FaGitlab } from "react-icons/fa";

export default class OurTeam extends Component {
  state = {
    teamData: [
      {
        id: 1,
        image: "/assets/images/photo.jpg",
        names: "Abizera Oreste",
        role: "Frontend and backend developer",
        links: [
          {
            username: "Oreste Abizera",
            url: "https://web.facebook.com/oreste.abizera.9",
            icon: <FaFacebook className="link-icon"></FaFacebook>
          },
          {
            username: "oreste-abizera",
            url: "https://www.github.com/oreste-abizera",
            icon: <FaGithub className="link-icon"></FaGithub>
          },
          {
            username: "Coderspace",
            url: "https://www.youtube.com/",
            icon: <FaYoutube className="link-icon"></FaYoutube>
          },
          {
            username: "Oreste Abizera",
            url: "https://oresteabizera.netlify.app",
            icon: <FaGlobe className="link-icon"></FaGlobe>
          }
        ]
      },
      {
        id: 2,
        image: "",
        names: "John Doe",
        role: "Frontend developer",
        links: [
          {
            username: "John Doe",
            url: "https://web.twitter.com",
            icon: <FaTwitter className="link-icon"></FaTwitter>
          },
          {
            username: "John Doe",
            url: "https://www.gitlab.com/",
            icon: <FaGitlab className="link-icon"></FaGitlab>
          },
          {
            username: "john-doe",
            url: "https://www.linkedin.com",
            icon: <FaLinkedin className="link-icon"></FaLinkedin>
          }
        ]
      },
      // {
      //   id: 3,
      //   image: "",
      //   names: "John Doe",
      //   role: "Frontend developer",
      //   links: [
      //     {
      //       username: "John Doe",
      //       url: "https://web.twitter.com",
      //       icon: <FaTwitter className="link-icon"></FaTwitter>
      //     },
      //     {
      //       username: "John Doe",
      //       url: "https://www.gitlab.com/",
      //       icon: <FaGitlab className="link-icon"></FaGitlab>
      //     },
      //     {
      //       username: "john-doe",
      //       url: "https://www.linkedin.com",
      //       icon: <FaLinkedin className="link-icon"></FaLinkedin>
      //     }
      //   ]
      // }
    ],
  };
  render() {
    return (
      <OurTeamWrapper>
        <Title center="true" title="Our Team"></Title>
        <div className="container-fluid">
          <div className="row">
            {this.state.teamData.map((item) => (
              <div
                key={item.id}
                className="team-item col-10 col-sm-8 col-md-6 col-lg-4 mx-auto pb-4 pt-5 my-5 mx-5"
              >
                <div className="text-center img-container">
                  <img src={item.image || "/assets/images/avatar.jpg"} alt={item.names} className="img-fluid"></img>
                </div>
                <h3 className="mt-3">{item.names}</h3>
                <p className="text-muted text-center">{item.role}</p>
                <div className="icons text-center">
                  {item.links.map((record, index) => {
                    return <a key={index} href={record.url} title={record.username} target="_new">
                      {record.icon}
                    </a>
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </OurTeamWrapper>
    );
  }
}

const OurTeamWrapper = styled.div`
.team-item{
  background: var(--mainWhite);
  box-shadow: var(--primaryBoxShadow);
  margin: 2rem 7rem !important;
}
.team-item:hover{
  box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
}
.team-item:hover img:hover{
  transform: scale(1.05);
}
.team-item .img-container{
  min-height: 25rem;
  max-height: 25rem;
}
.icons a{
  margin: 0.5rem;
}
.link-icon{
  font-size: 1.8rem;
  color: var(--mainWhite);
  background: var(--primaryColor);
  padding: 0.2rem;
  border-radius: 0.2rem;
}
.link-icon:hover{
  background: var(--darkGrey);
}
`;
