import React from "react";
import { UserContext } from "../../context/UserContext";
import { AdoContext } from "../../context/context";
import { createClass, updateClass } from "../../helpers/functions";

export default function CreateClass({
  id = "modal01",
  currentClass = {},
  edit = false,
}) {
  const { user, reloadContent } = React.useContext(UserContext);
  const { showAlert } = React.useContext(AdoContext);
  const handleCreateClass = async (e) => {
    e.preventDefault();
    let modal = document.getElementById(id);
    const name = document.getElementById(`${currentClass._id}className`);
    let classname = name ? name.value : "";
    let classTeacher;
    let { type, _id } = user.user;
    if (type === "teacher") {
      classTeacher = _id;
    }
    let response;
    if (edit) {
      response = await updateClass(
        { name: classname },
        currentClass._id,
        user.token
      );
    } else {
      response = await createClass(
        { name: classname, classTeacher },
        user.token
      );
    }
    let { success, error } = response.data;
    if (success) {
      let message = edit
        ? `class successifully updated`
        : `${classname} created successifully`;
      window.Toast.fire({
        title: message,
      });
      reloadContent();
      modal.style.display = "none";
    } else {
      showAlert({
        message: error || "something went wrong",
        type: "danger",
      });
    }
  };
  return (
    <form className="form-container" onSubmit={handleCreateClass}>
      <div className="form-group">
        <label htmlFor="className">Class name</label>
        <input
          type="text"
          id={currentClass._id + "className"}
          defaultValue={currentClass.name ? currentClass.name : ""}
          className="form-control"
        ></input>
      </div>

      <div className="form-group">
        <input
          type="submit"
          value={edit ? "Edit Class" : "Create class"}
          className="ado-btn-outline form-control"
        ></input>
      </div>
    </form>
  );
}
