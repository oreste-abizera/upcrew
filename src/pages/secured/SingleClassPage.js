import React from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";

export default function SingleClassPage(props) {
  const { id } = props.match.params;
  const { sidebarOpen, classes, user } = React.useContext(UserContext);
  const findClass = classes.find(
    (item) => item._id === id && item.classTeacher === user.user._id
  );
  console.log(findClass);
  return (
    <SingleClassPageWrapper sidebarOpen={sidebarOpen}>
      {findClass && <div>{findClass.name}</div>}
    </SingleClassPageWrapper>
  );
}

const SingleClassPageWrapper = styled.div`
  @media screen and (min-width: 786px) {
    margin-left: ${(props) => (props.sidebarOpen === true ? "26%" : "1%")};
  }
`;
