import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import Loader from "../../components/Loader";
import CustomizeClass from "../../components/SingleClassPage/CustomizeClass";

export default function SingleClassPage(props) {
  const { id } = props.match.params;
  const { sidebarOpen, classes, user } = React.useContext(UserContext);
  const findClass = classes.find(
    (item) => item._id === id && item.classTeacher === user.user._id
  );
  return (
    <SingleClassPageWrapper sidebarOpen={sidebarOpen}>
      {findClass ? (
        <CustomizeClass cClass={findClass}></CustomizeClass>
      ) : (
        <Loader text="Class loading"></Loader>
      )}
    </SingleClassPageWrapper>
  );
}

const SingleClassPageWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
