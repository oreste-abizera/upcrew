import React from "react";
import { AssignmentsContext } from "../../context/AssignmentsContext";
import { UserContext } from "../../context/UserContext";
import SingleAssignmentItem from "./SingleAssignmentItem";
import Heading from "../Heading";
import AssignmentsColumns from "./AssignmentsColumns";
import AssignmentFilters from "./AssignmentFilters";

export default function AssignmentsList() {
  const { user, users } = React.useContext(UserContext);
  const { filteredAssignments } = React.useContext(AssignmentsContext);
  let [stateUser, setStateUser] = React.useState({});
  let [checkedAssignments, setCheckedAssignments] = React.useState([]);
  React.useEffect(() => {
    let tempUser = users.find((record) => record.id === user.user.id);
    if (tempUser) {
      setStateUser(tempUser);
    }
  }, [users]);

  React.useEffect(() => {
    let tempAssignments = filteredAssignments.filter(
      (record) => record.class === stateUser.currentClass
    );
    setCheckedAssignments(tempAssignments);
  }, [filteredAssignments, stateUser]);

  return (
    <>
      <Heading title="Assignments list"></Heading>
      <AssignmentFilters></AssignmentFilters>
      <p className="text-center mt-2">
        {checkedAssignments.length} assignments found.
      </p>
      <AssignmentsColumns></AssignmentsColumns>
      {checkedAssignments.length === 0 && (
        <p className="text-center">No assignment found</p>
      )}
      {checkedAssignments.map((record, index) => (
        <SingleAssignmentItem
          key={record.id}
          data={record}
          index={index}
        ></SingleAssignmentItem>
      ))}
    </>
  );
}
