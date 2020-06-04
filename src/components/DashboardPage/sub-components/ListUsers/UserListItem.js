import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Modal from "../../../Modal"
import EditUser from "./UserActions/EditUser";
import { UserContext } from "../../../../context/UserContext";

export default function UserListItem({ user, index, actions, userClass }) {
  const [data, setData] = React.useState(user);
  const { formatUser, classes } = React.useContext(UserContext)

  React.useEffect(() => {
    setData(formatUser(user));
  }, [classes]);

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
          <img src={data.image || "/assets/images/avatar.jpg"} alt={data.firstName} className="img-fluid" width="50" height="50" style={{ borderRadius: "50%", maxHeight: "4rem" }}></img>
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
            <>
              <Modal id={`user${data.id}`} header="Change Profile info" opener={true} body={<EditUser user={data}></EditUser>}>
                <button
                  className="action-btn">
                  <FaEdit className="btn-icon main-text"></FaEdit>
                </button>
              </Modal>
              <button
                className="action-btn ml-3"
                onClick={() => {
                  console.log("delete user " + data.id);
                }}
              >
                <FaTrash className="btn-icon text-danger"></FaTrash>
              </button>
            </>
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
