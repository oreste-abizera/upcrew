import React from "react";
import { formatClass } from "../../helpers/functions";
import styled from "styled-components";
import Loader from "../Loader"

export default function CourseListItem({ cClass, index, shown, changeShown }) {
  let show = false;
  if (shown === index) {
    show = true;
  }
  const [currentClass, setCurrentClass] = React.useState(cClass);
  const [loading, setLoading] = React.useState(true)
  async function mount() {
    let formatedClass = await formatClass(cClass);
    setCurrentClass(formatedClass);
    setLoading(false)
  }
  React.useEffect(() => {
    mount();
  }, []);
  if (loading) {
    if (index === 0) {
      return <Loader text="Courses loading..."></Loader>
    } else {
      return <p className="text-center">loading...</p>
    }
  }
  return (
    <CourseListItemWrapper show={show}>
      <div className="container-fluid mt-3 mt-md-0">
        <div className="row">
          <div className="col-6 col-md-4 main-text">{`${index + 1}.  ${
            currentClass.name
            }`}</div>
          <div className="col-6 col-md-4">
            <ul className="courses-list">
              {currentClass.courses.map((item, index) =>
                item ? <li key={index}>{item}</li> : ""
              )}
            </ul>
          </div>
          <div className="col-md-4">
            <span className="main-text d-md-none">Class teacher: </span>
            {currentClass.classTeacher}
          </div>
        </div>
        <hr />
      </div>

      {/* <div className="container-fluid mt-3">
        <div className="panel panel-primary">
          <div
            className="panel-heading"
            onClick={() => {
              changeShown(index);
            }}
          >
            <h5 className="panel-title">{currentClass.name}</h5>
          </div>
          <div className="panel-body">
            <div className="col-10">
              <ul className="courses-list">
                {currentClass.courses.map((item, index) =>
                  item ? <li key={index}>{item}</li> : ""
                )}
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </CourseListItemWrapper>
  );
}

CourseListItem.defaultProps = {
  cClass: {},
};

const CourseListItemWrapper = styled.div`
  .courses-list {
    /* text-transform: lowercase; */
  }
  .courses-list li {
    list-style-type: square;
  }
  .panel-heading {
    /* background-color: var(--primaryColor); */
    cursor: pointer;
  }
  .panel-body {
    display: ${(props) => (props.show === true ? "block" : "none")};
  }
`;
