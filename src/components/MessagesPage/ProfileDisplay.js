import React from "react"
import styled from "styled-components"
import { UserContext } from "../../context/UserContext"
import { Link } from "react-router-dom";

export default function ProfileDisplay({ user = {} }) {
    const { users } = React.useContext(UserContext)
    let currentUser = users.find(item => item.id === user.id)
    return <ProfileDisplayWrapper>
        <div>
            <img alt={currentUser.firstName} src={currentUser.image.url || "/assets/images/avatar.jpg"} className="img-thumbnail img img-fluid"></img>
        </div>
        <div>
            <p>{`${currentUser.firstName} ${currentUser.lastName}`}</p>
            <p>{currentUser.userCountry}</p>
            <p>{currentUser.userEmail}</p>
        </div>
        <Link to={`/profile/${currentUser.id}`} target="_new" className="btn btn-outline ado-btn-outline">Profile</Link>
    </ProfileDisplayWrapper>
}

const ProfileDisplayWrapper = styled.div`
box-shadow: var(--primaryBoxShadow);
z-index: 1;
background: var(--mainGrey);
padding: 0.5rem;
text-align: center;
min-width: 12rem;
img{
    max-height: 10rem;
}
`