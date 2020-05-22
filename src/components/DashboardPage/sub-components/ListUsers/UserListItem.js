import React from "react";
import { formatUser } from "../../../../helpers/functions";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function UserListItem({ user, index, actions, userClass }) {
  const [data, setData] = React.useState(user);

  //function to call user formatter
  async function format() {
    setData(await formatUser(user));
  }
  React.useEffect(() => {
    format();
  }, []);

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
          <img src={data.image.url || "/assets/images/avatar.jpg"} alt={data.firstName} className="img-fluid" width="50" height="50" style={{ borderRadius: "50%", maxHeight: "4rem" }}></img>
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
              <button
                className="action-btn"
                onClick={() => {
                  console.log("edit user " + data.id);
                }}
              >
                <FaEdit className="btn-icon main-text"></FaEdit>
              </button>
              <button
                className="action-btn"
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
