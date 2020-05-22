import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../context/UserContext";
import UserList from "./UserList";
import Heading from "../../../Heading";
import UsersFilters from "./UsersFilters";
import Modal from "../../../Modal"
import NewTeacher from "./AddNew/NewTeacher";

export default function TeachersList() {
  const { filteredUsers, resetClass } = React.useContext(UserContext);
  resetClass();
  const teachers = filteredUsers.filter((item) => item.type === 2);
  return (
    <TeachersListWrapper>
      <Heading title="Teachers list"></Heading>
      <UsersFilters>
        <Modal buttonName="Add new teacher" header="Add teacher" body={<NewTeacher></NewTeacher>}></Modal>
      </UsersFilters>
      <UserList data={teachers} userClass={false}></UserList>
    </TeachersListWrapper>
  );
}

const TeachersListWrapper = styled.div``;
