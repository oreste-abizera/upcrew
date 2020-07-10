import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { AdoContext } from "../../context/context";
import MyProfile from "../../components/UpdateMyProfilePage/MyProfile";
import UpdatePassword from "../../components/UpdateMyProfilePage/UpdatePassword";
import { UpdateMyDetails, UpdateMyPassword } from "../../helpers/functions";

export default function UpdateMyProfile({ history }) {
  const {
    sidebarOpen,
    user: me,
    user: { user },
    reloadContent,
  } = React.useContext(UserContext);
  const { showAlert } = React.useContext(AdoContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {
      firstName: window.fname.value,
      lastName: window.lname.value,
      userName: window.username.value,
      userEmail: window.email.value,
      dateOfBirth: window.dob.value,
      phoneNumber: window.phoneNumber.value,
      userCountry: window.country.value,
    };
    let response = await UpdateMyDetails(updates, me.token);
    const { success, error, data } = response.data;
    if (success) {
      reloadContent();
      window.Toast.fire({
        title: "My profile info updated successifully",
      });
      console.log(data);
      history.push("/profile");
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const currentPassword = window.currentPassword.value;
    const newPassword = window.newPassword.value;
    let response = await UpdateMyPassword(
      { newPassword, currentPassword },
      me.token
    );
    const { success, error } = response.data;
    if (success) {
      reloadContent();
      window.Toast.fire({
        title: "My password was updated successifully",
      });
      history.push("/profile");
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <UpdateMyProfileWrapper sidebarOpen={sidebarOpen}>
      <div className="container">
        <div className="row">
          <div className="col-11 col-md-8 mx-auto profile-form my-3 p-5">
            <MyProfile user={user} handleSubmit={handleSubmit}></MyProfile>
          </div>
          <div className="col-11 col-md-8 mx-auto profile-form my-3 p-5">
            <UpdatePassword handleSubmit={changePassword}></UpdatePassword>
          </div>
        </div>
      </div>
    </UpdateMyProfileWrapper>
  );
}

const UpdateMyProfileWrapper = styled.div`
  .profile-form {
    background: var(--mainWhite);
  }
  @media screen and (min-width: 768px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
