import React from "react";
import styled from "styled-components";
import ProfileList from "./ProfileList";
import UserList from '../DashboardPage/sub-components/ListUsers/UserList'

export default function ProfileData({ title, data, columns }) {
  if (columns) {
    return (
      <ProfileDataWrapper>
        <button className="btn btn-outline-success ado-btn-outline profile-btn">
          {title}
        </button>
        <div className="line"></div>
        <UserList data={data} actions={false}></UserList>
      </ProfileDataWrapper>
    );
  }
  return (
    <ProfileDataWrapper>
      <button className="btn btn-outline-success ado-btn-outline profile-btn">
        {title}
      </button>
      <div className="line"></div>
      {data.length === 0 ? (
        <div className="p-3 my-2">{title} is loading...</div>
      ) : (
        <ProfileList data={data}></ProfileList>
      )}
    </ProfileDataWrapper>
  );
}

const ProfileDataWrapper = styled.div`
  margin-top: 1rem;
  position: relative;
  text-align: left;
  .line {
    position: absolute;
    display: inline-block;
    background: var(--primaryColor);
    height: 0.2rem;
    width: 9rem;
    top: 0;
  }
  @media screen and (min-width: 576px) {
    .line {
      width: 15rem;
    }
  }
  @media screen and (min-width: 768px) {
    .line {
      width: 25rem;
    }
  }
  @media screen and (min-width: 1270px) {
    .line {
      width: 35rem;
    }
  }
`;

ProfileData.defaultProps = {
  title: "Default Information",
  data: [],
};
