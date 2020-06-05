import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../context/UserContext";
import UserList from "./UserList";
import Heading from "../../../Heading";
import UsersFilters from "./UsersFilters";
import Modal from "../../../Modal"
import NewUser from "./AddNew/NewUser";

export default function StudentsList() {
  const { filteredUsers, resetCountry } = React.useContext(UserContext);
  resetCountry();
  const students = filteredUsers.filter((item) => item.type === "student");

  return (
    <StudentsListWrapper>
      <Heading title="Students List"></Heading>
      <UsersFilters userClass={true}>
        <Modal buttonName="Add new student" id="addNewStudent" header="Add student" body={<NewUser type="student" id="addNewStudent"></NewUser>}></Modal>
      </UsersFilters>
      <UserList data={students} userClass={true}></UserList>
    </StudentsListWrapper>
  );
}

const StudentsListWrapper = styled.div``;
