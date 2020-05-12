import React from "react";
// import Hero from "../components/Hero";
import aboutBcg from "../assets/images/aboutBcg.jpeg";
import AboutInfo from "../components/AboutPage/Info";

export default function AboutPage() {
  return (
    <>
      {/* <Hero img={aboutBcg} /> */}
      <AboutInfo img={aboutBcg}></AboutInfo>
    </>
  );
}
