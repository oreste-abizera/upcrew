import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import {
  getPersonalInfo,
  getFatherInfo,
  getMotherInfo,
} from "../../helpers/profileFunctions";
import ProfileData from "../../components/ProfilePage/ProfileData";
import Loader from "../../components/Loader";

export default function Profile2(props) {
  const { slug } = props.match.params;
  const [user, setUser] = React.useState({});
  const { getUser, users, classes, settings, sidebarOpen } = React.useContext(UserContext);
  const [personalInfo, setPersonalInfo] = React.useState([]);
  const [parentInfo, setParentInfo] = React.useState([]);
  const [childrenInfo, setChildrenInfo] = React.useState([]);

  React.useEffect(() => {
    let searchUser = getUser(slug);
    setUser(searchUser);
  }, [users, settings, classes]);

  //useEffect for getting info
  React.useEffect(() => {
    if (user) {
      let userInfo = getPersonalInfo(user);
      let fatherInfo = getFatherInfo(user);
      let motherInfo = getMotherInfo(user);
      setParentInfo([...fatherInfo, ...motherInfo]);
      setPersonalInfo(userInfo);
      setChildrenInfo(user.children);
    }
  }, [user]);

  if (!user) {
    return <Loader text="User Data loading..."></Loader>;
  }
  if (user.length === 0) {
    return <div className="text-center mt-5">Sorry. No user found</div>;
  }
  return (
    <ProfileWrapper sidebarOpen={sidebarOpen}>
      <div className="personal-data mx-auto">
        {user.image && (
          <img
            src={user.image.url ? user.image.url : "/assets/images/avatar.jpg"}
            alt={user.userName}
            className="img-thumbnail"
          ></img>
        )}

        <br />
        <ProfileData
          title="Personal Information"
          data={personalInfo}
        ></ProfileData>
        {user.type === 1 && (
          <div>
            <ProfileData
              title="Parent Information"
              data={parentInfo}
            ></ProfileData>
            <ProfileData title="Payment History"></ProfileData>
          </div>
        )}
        {user.type === 5 && (
          <div>
            <ProfileData
              title="Children Information"
              data={childrenInfo}
              columns
            ></ProfileData>
            <ProfileData title="Payment History"></ProfileData>
          </div>
        )}
      </div>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  padding: 2rem;
  .personal-data {
    text-align: center;
  }
  .personal-data img {
    max-width: 10rem;
    border-radius: 50%;
  }
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
    .personal-data {
      width: 100%;
    }
  }
`;
