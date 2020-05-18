import React from 'react'
import styled from 'styled-components'
import LaptopImg from "../../assets/images/laptop.png"
import UpcrewVideo from "../../assets/videos/upcrew.mp4"

export default function Laptop() {
    return <LaptopWrapper>
        <div className="laptop">
            <img src={LaptopImg}></img>
            <video src={UpcrewVideo} controls></video>
        </div>
    </LaptopWrapper>
}

const LaptopWrapper = styled.section`
.laptop{
    min-width: 80%;
    min-height: 9rem;
    /* background: #ffffff; */
    padding: 1rem;
    position: relative;
}
.laptop img{
  width: 100%;
}
.laptop video{
    position: absolute;
    width: 63.5%;
    height: 73%;
    background: #000;
    top: 12%;
    left: 19.5%;
    outline: none;
}
@media screen and (min-width: 576px) {
    /* margin: 25% auto; */
    margin-top: 25%;
    .laptop video{
    width: 64%;
    left: 19.6%;
}
}
`