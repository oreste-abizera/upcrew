import React from "react"
import styled from "styled-components"
import { UserContext } from "../../../context/UserContext"
import { Link } from "react-router-dom";

export default function DisplayClass({ currentClass = {} }) {
    const { sidebarOpen, courses } = React.useContext(UserContext)
    const [classCourses, setClassCourses] = React.useState([])
    const [displayClass, setDisplayClass] = React.useState({})


    React.useEffect(() => {
        let { courses: tempClassCourses = [] } = currentClass
        tempClassCourses = tempClassCourses.map(record => {
            let courseData = courses.find(item => item.id === parseInt(record))
            return courseData
        })
        setClassCourses(tempClassCourses)
        if (tempClassCourses[0]) {
            setDisplayClass(tempClassCourses[0])
        }
    }, [currentClass, courses])

    return <div className={sidebarOpen ? "col-10 col-md-6 mt-5 mx-auto" : "col-10 col-md-5 mt-5 mx-auto"}>
        <DisplayClassWrapper>
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <h5 className="panel-title">{currentClass.name}</h5>
                </div>
                <div className="panel-body row">
                    <div className="col-5 mx-auto">
                        <div className="course-list">
                            {
                                <div className="text-center">
                                    <h6 className="text-center course-name">{displayClass.name}</h6>
                                    <img className="img-fluid course-img" src={displayClass.image || "/assets/images/react.png"} alt={displayClass.name}></img>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="col-5 mx-auto">
                        <div className="class-data">
                            <div>
                                <h6>Students</h6>
                                <p>30 students</p>
                            </div>

                            <div>
                                <h6>Courses</h6>
                                <p>{classCourses.length} courses</p>
                            </div>

                            <div>
                                <h6>Projects</h6>
                                <p>10 projects</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel-footer">
                    <Link to="/myClass">Customize Class</Link>
                </div>
            </div>
        </DisplayClassWrapper>
    </div>
}

const DisplayClassWrapper = styled.div`
.panel{
border-color: var(--primaryColor);
}

.panel-heading {
    background-color: var(--primaryColor);
    border-color: var(--primaryColor);
  }

  .course-list{
      background: var(--lightGrey);
      padding: 0.3rem 0.6rem;
      margin-top: 2rem;
  }

  .course-name{
      /* font-size: 0.9rem; */
  }

  .course-img{
      max-width: 7rem;
      max-height: 8rem;
  }

  .class-data h6{
      font-weight: bolder;
  }
  `