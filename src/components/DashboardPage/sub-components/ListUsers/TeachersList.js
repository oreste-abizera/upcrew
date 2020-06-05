import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../context/UserContext";
import UserList from "./UserList";
import Heading from "../../../Heading";
import UsersFilters from "./UsersFilters";
import Modal from "../../../Modal"
import NewUser from "./AddNew/NewUser";

export default function TeachersList({ history }) {
  const { filteredUsers, resetClass } = React.useContext(UserContext);
  resetClass();
  const teachers = filteredUsers.filter((item) => item.type === "teacher");
  return (
    <TeachersListWrapper>
      <Heading title="Teachers list"></Heading>
      <UsersFilters>
        <Modal buttonName="Add new teacher" id="addNewTeacher" header="Add teacher" body={<NewUser type="teacher" id="addNewTeacher"></NewUser>}></Modal>
      </UsersFilters>
      <UserList data={teachers} userClass={false}></UserList>
    </TeachersListWrapper>
  );
}

const TeachersListWrapper = styled.div``;
