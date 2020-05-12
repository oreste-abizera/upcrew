import React from "react";
import styled from "styled-components";
import { UserContext } from "../../../../context/UserContext";
import UserList from "./UserList";
import Heading from "../../../Heading";
import UsersFilters from "./UsersFilters";

export default function StudentsList() {
  const { filteredUsers, resetCountry } = React.useContext(UserContext);
  resetCountry();
  const students = filteredUsers.filter((item) => item.type === 1);

  return (
    <StudentsListWrapper>
      <Heading title="Students List"></Heading>
      <UsersFilters userClass={true}>
        <button className="ado-btn">Add new Student</button>
      </UsersFilters>
      <UserList data={students} userClass={true}></UserList>
    </StudentsListWrapper>
  );
}

const StudentsListWrapper = styled.div``;
