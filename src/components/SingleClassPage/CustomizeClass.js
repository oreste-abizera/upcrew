import React from "react";
import styled from "styled-components";
import ClassCourses from "./ClassCourses";
import ClassStudents from "./ClassStudents";

export default function CustomizeClass({ cClass = {} }) {
  const [displayedPart, setDisplayedPart] = React.useState("");
  const handleDisplay = (name = "") => {
    console.log(name);
    if (name === displayedPart) {
      name = "";
    }
    setDisplayedPart(name);
  };
  return (
    <CustomizeClassWrapper>
      <div className="col-11 mx-auto text-center">
        <h1 className="main-text my-4" style={{ border: "none" }}>
          {cClass.name}
        </h1>
        <ClassCourses
          cClass={cClass}
          shown={displayedPart}
          changeShown={handleDisplay}
        ></ClassCourses>
        <ClassStudents
          cClass={cClass}
          shown={displayedPart}
          changeShown={handleDisplay}
        ></ClassStudents>
      </div>
    </CustomizeClassWrapper>
  );
}

const CustomizeClassWrapper = styled.div`
  .img-container img {
    max-height: 5rem;
  }
  .addCourse {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon {
    font-size: 1.8rem;
    color: var(--primaryColor);
    cursor: pointer;
  }
`;
