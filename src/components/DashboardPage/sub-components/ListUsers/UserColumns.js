import React from "react";

export default function UserColumns({ userClass }) {
  return (
    <div className="container-fluid d-none d-lg-block my-4">
      <hr></hr>
      <div className="row main-text">
        <div className="col-1">#</div>
        <div className="col-2">Photo</div>
        <div className="col-2">Names</div>
        <div className="col-3">Email</div>
        <div className="col-2">{userClass ? "Class" : "Phone number"}</div>
        <div className="col-1">Country</div>
        <div className="col-1">Actions</div>
      </div>
      <hr></hr>
    </div>
  );
}

UserColumns.defaultProps = {
  userClass: true,
};
