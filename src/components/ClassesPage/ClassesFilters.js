import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import Modal from "../Modal";
import CreateClass from "./CreateClass";

export default function ClassesFilters() {
  const {
    nbrOfStudents,
    handleNbrOfStudents,
    maxNbrOfStudents,
    classname,
    handleClassname,
    user,
  } = React.useContext(UserContext);
  return (
    <ClassesFiltersWrapper>
      <div className="container-fluid row">
        <div className="form-group col-12 col-md-4">
          <label htmlFor="classname">Filter by name</label>
          <input
            type="text"
            id="classname"
            className="form-control"
            value={classname}
            onChange={handleClassname}
          ></input>
        </div>

        <div className="form-group col-12 col-md-4">
          <label htmlFor="nbrOfStudents">{nbrOfStudents} students</label>
          <input
            type="range"
            id="nbrOfStudents"
            className="form-control"
            min="0"
            max={maxNbrOfStudents}
            value={nbrOfStudents}
            onChange={handleNbrOfStudents}
          ></input>
        </div>

        {user.user.type === "teacher" && (
          <div className="form-group col-12 col-md-4">
            <Modal
              buttonName="Create class"
              header="Create class"
              body={<CreateClass id="createClass"></CreateClass>}
              id="createClass"
            ></Modal>
          </div>
        )}
      </div>
    </ClassesFiltersWrapper>
  );
}

const ClassesFiltersWrapper = styled.div``;
