import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../context/UserContext";
import UserList from "./UserList";
import Heading from "../../../Heading";
import UsersFilters from "./UsersFilters";

export default function TeachersList() {
  const { filteredUsers, resetClass } = React.useContext(UserContext);
  resetClass();
  const teachers = filteredUsers.filter((item) => item.type === 2);
  return (
    <TeachersListWrapper>
      <Heading title="Teachers list"></Heading>
      <UsersFilters>
        <button className="ado-btn">Add new Teacher</button>
      </UsersFilters>
      <UserList data={teachers} userClass={false}></UserList>
    </TeachersListWrapper>
  );
}

const TeachersListWrapper = styled.div``;
