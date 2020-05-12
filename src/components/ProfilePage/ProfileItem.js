import React from "react";
import styled from "styled-components";

export default function ProfileItem({ index, field, value }) {
  let isOdd = (index + 1) % 2;

  return (
    <ProfileItemWrapper isOdd={isOdd}>
      <div className="container-fluid my-2 p-1">
        <div className="row">
          <div className="col-5 text-main">{field}</div>
          <div className="col-7">: {value}</div>
        </div>
      </div>
    </ProfileItemWrapper>
  );
}

const ProfileItemWrapper = styled.div`
  background: ${(props) => (props.isOdd === 0 ? "var(--lightGrey)" : "none")};
`;
