import React from 'react'
import styled from 'styled-components'
import versionsData from "./versionsData"
import Title from '../Title'
import VersionInProgressVideo from "../../assets/videos/inProgress.mp4"
import defaultPoster from "../../assets/images/defaultPoster.png"

export default function Versions() {
    return <VersionsWrapper>
        <Title title="Versions" center></Title>
        <div className="container mt-4">
            <div className="row">
                {versionsData.map((record, index) => <div className="col-10 col-md-6 col-lg-4 my-3 mx-auto text-center" key={index}>
                    <h2 className="version-title">{record.title}</h2>
                    <p className="text-muted version-description">{record.description}</p>
                    <video className="version-video" src={record.video || VersionInProgressVideo} controls poster={record.poster || defaultPoster}></video>
                </div>)}
            </div>
        </div>
    </VersionsWrapper>
}

const VersionsWrapper = styled.div`
margin: 3rem 0;
padding: 4rem 0;
background: var(--primaryBg);
.version-title{
    color: var(--mainWhite);
}
.version-video{
    width: 100%;
    min-height: 15rem;
    max-height: 15rem;
    background: white;
}
@media screen and (min-width: 576px){
.version-description{
    min-height: 7rem;
}   
}

`