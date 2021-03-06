import React from "react";
import styled from "styled-components";
import {
  updateUser,
  UpdateProfilePicture,
} from "../../../../../helpers/functions";
import { UserContext } from "../../../../../context/UserContext";
import { AdoContext } from "../../../../../context/context";
import { url, defaultImg } from "../../../../../helpers/url";

export default function EditUser({ user, id }) {
  const [imageData, setImageData] = React.useState();
  const { showAlert } = React.useContext(AdoContext);
  const { user: me, reloadContent, solveResponse } = React.useContext(
    UserContext
  );
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImageData(reader.result);
      };
    } else {
      setImageData(undefined);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let modal = document.getElementById(id);
    const detailsToUpdate = {
      firstName: document.getElementById(`fname${user.id}`).value,
      lastName: document.getElementById(`lname${user.id}`).value,
      userName: document.getElementById(`username${user.id}`).value,
      dateOfBirth: document.getElementById(`dob${user.id}`).value,
      userEmail: document.getElementById(`email${user.id}`).value,
      userCountry: document.getElementById(`country${user.id}`).value,
      phoneNumber: document.getElementById(`phone${user.id}`).value,
    };
    let response = await updateUser(detailsToUpdate, user.id, me.token);
    const { success, error } = response.data;
    if (success) {
      modal.style.display = "none";
      window.Toast.fire({
        title: "User info updated successifully",
      });
      reloadContent();
    } else {
      showAlert({
        message: error || "Something went wrong",
        type: "danger",
      });
    }

    //check image
    window.Swal.fire("Accessing your data. please wait...");
    if (imageData) {
      let imageResponse = await UpdateProfilePicture(
        imageData,
        user.id,
        me.token
      );
      solveResponse(imageResponse, "User info updated successifully");
    }
  };
  return (
    <EditUserWrapper>
      <div className="container">
        <form className="col-10 form-container" onSubmit={handleSubmit}>
          {/* single input */}
          <div className="form-group">
            <label htmlFor={`fname${user.id}`}>First name</label>
            <input
              type="text"
              className="form-control"
              id={`fname${user.id}`}
              defaultValue={user.firstName}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <label htmlFor={`lname${user.id}`}>Last name</label>
            <input
              type="text"
              className="form-control"
              id={`lname${user.id}`}
              defaultValue={user.lastName}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <label htmlFor={`username${user.id}`}>Username</label>
            <input
              type="text"
              className="form-control"
              id={`username${user.id}`}
              defaultValue={user.userName}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <label htmlFor={`dob${user.id}`}>Date of birth</label>
            <input
              type="date"
              className="form-control"
              id={`dob${user.id}`}
              defaultValue={user.dateOfBirth}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <label htmlFor={`email${user.id}`}>Email</label>
            <input
              type="email"
              className="form-control"
              id={`email${user.id}`}
              defaultValue={user.userEmail}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <label htmlFor={`phone${user.id}`}>Phone Number</label>
            <input
              type="text"
              className="form-control"
              id={`phone${user.id}`}
              defaultValue={user.phoneNumber}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <label htmlFor={`country${user.id}`}>Country</label>
            <input
              type="text"
              className="form-control"
              id={`country${user.id}`}
              defaultValue={user.userCountry}
            ></input>
          </div>
          {/* end of single input */}

          {/* single input */}
          <div className="form-group">
            <img
              src={user.image ? `${url}/uploads/${user.image}` : defaultImg}
              alt={user.userName}
              className="img img-fluid"
              width="100"
              height="100"
            ></img>
            <input
              type="file"
              className="form-control"
              id={`image${user.id}`}
              onChange={handleImage}
            ></input>
          </div>
          {/* end of single input */}

          {/* submit */}
          <div className="form-group">
            <input
              type="submit"
              value="save changes"
              className="btn btn-block ado-btn-outline"
            ></input>
          </div>
          {/* end of submit */}
        </form>
      </div>
    </EditUserWrapper>
  );
}

const EditUserWrapper = styled.div``;
