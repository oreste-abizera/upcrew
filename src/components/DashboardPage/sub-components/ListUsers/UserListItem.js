import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../../../Modal";
import EditUser from "./UserActions/EditUser";
import { UserContext } from "../../../../context/UserContext";
import { deleteUser } from "../../../../helpers/functions";
import { AdoContext } from "../../../../context/context";
import { defaultImg, url } from "../../../../helpers/url";

export default function UserListItem({ user, index, actions, userClass }) {
  const [data, setData] = React.useState(user);
  const { formatUser, classes, user: me, reloadContent } = React.useContext(
    UserContext
  );
  const { showAlert } = React.useContext(AdoContext);

  React.useEffect(() => {
    setData(formatUser(user));
  }, [classes]);

  const handleDelete = async () => {
    let response = await deleteUser(data.id, me.token);
    const { success, error } = response.data;
    if (success) {
      window.Toast.fire({
        title: "User deleted successifully",
      });
      reloadContent();
    } else {
      showAlert({
        message: error || "Something went wrong",
        type: "danger",
      });
    }
  };

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-1">
          <span className="d-lg-none main-text">#: </span>
          {index + 1}
        </div>
        <div className="col-lg-2">
          {/* <span className="d-lg-none main-text">Roll Number: </span> */}
          {/* {data.rollNumber} */}
          <img
            src={data.image ? `${url}/uploads/${data.image}` : defaultImg}
            alt={data.firstName}
            className="img-fluid"
            width="50"
            height="50"
            style={{ borderRadius: "50%", maxHeight: "4rem" }}
          ></img>
        </div>
        <div className="col-lg-2">
          <span className="d-lg-none main-text">Names: </span>
          {`${data.firstName} ${data.lastName}`}
        </div>
        <div className="col-lg-3">
          <span className="d-lg-none main-text">Email: </span>
          {data.userEmail}
        </div>
        <div className="col-lg-2">
          <span className="d-lg-none main-text">
            {userClass ? "Class" : "Phone Number"}:{" "}
          </span>
          {userClass ? data.currentClass : data.phoneNumber || "N/A"}
        </div>
        <div className="col-lg-1">
          <span className="d-lg-none main-text">Country: </span>
          {data.userCountry}
        </div>
        <div className="col-lg-1">
          {actions ? (
            <div className="row">
              <Modal
                id={`user${data.id}`}
                header="Change Profile info"
                opener={true}
                body={<EditUser user={data} id={`user${data.id}`}></EditUser>}
              >
                <button className="action-btn">
                  <FaEdit className="btn-icon main-text"></FaEdit>
                </button>
              </Modal>
              <button
                className="action-btn ml-3 ml-lg-0"
                onClick={handleDelete}
              >
                <FaTrash className="btn-icon text-danger"></FaTrash>
              </button>
            </div>
          ) : (
            <Link
              to={`/profile/${data.id}`}
              className="action-button"
              target="_new"
            >
              profile
            </Link>
          )}
        </div>
      </div>
      <hr></hr>
    </div>
  );
}
