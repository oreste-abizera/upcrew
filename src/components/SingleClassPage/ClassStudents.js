import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import UserList from "../DashboardPage/sub-components/ListUsers/UserList";
import { Link } from "react-router-dom";

export default function ClassStudents({ cClass = {}, shown, changeShown }) {
  const keyName = "ClassStudents";
  const displayed = keyName === shown;
  const { users } = React.useContext(UserContext);
  const students = users.filter(
    (item) => item.type === "student" && item.currentClass === cClass._id
  );
  let filteredStudents = students;
  if (students.length > 4) {
    filteredStudents = students.slice(0, 4);
  }
  return (
    <div id="students" className="my-3">
      <h2
        onClick={() => {
          changeShown(keyName);
        }}
      >
        {students.length} current students{" "}
        <span>
          {displayed ? (
            <FaAngleUp className="icon"></FaAngleUp>
          ) : (
            <FaAngleDown className="icon"></FaAngleDown>
          )}
        </span>
      </h2>
      {displayed && (
        <div>
          <UserList data={filteredStudents} actions={false}></UserList>
          {students.length > 4 && (
            <Link to="#" className="ado-btn">
              View All
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
