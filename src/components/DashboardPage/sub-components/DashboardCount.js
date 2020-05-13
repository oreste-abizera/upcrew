import React from "react";
import styled from "styled-components";
import { FaEnvelope, FaBars } from "react-icons/fa";
import { MdGroup, MdGroupAdd, MdBook, MdSettings } from "react-icons/md";
import SingleCount from "./SingleCount";
import Heading from "../../Heading";

export default function DashboardCount({ users }) {
  let students = users.filter((item) => item.type === 1);
  let teachers = users.filter((item) => item.type === 2);
  let parents = users.filter((item) => item.type === 5);
  let librarians = users.filter((item) => item.type === 4);
  let hostelManagers = users.filter((item) => item.type === 6);
  let data = [
    {
      id: 1,
      title: "student",
      subtitle: "Total students",
      number: students.length,
      icon: <MdGroupAdd className="count-icon"></MdGroupAdd>,
      bg: "red",
    },
    {
      id: 2,
      title: "teacher",
      subtitle: "Total teachers",
      number: teachers.length,
      icon: <MdGroup className="count-icon"></MdGroup>,
      bg: "green",
    },
    {
      id: 3,
      title: "parent",
      subtitle: "Total parents",
      number: parents.length,
      icon: <MdGroupAdd className="count-icon"></MdGroupAdd>,
      bg: "aqua",
    },
    {
      id: 4,
      title: "librarian",
      subtitle: "Total librarians",
      number: librarians.length,
      icon: <MdGroup className="count-icon"></MdGroup>,
    },
    {
      id: 5,
      title: "books",
      subtitle: "Total books",
      number: 100,
      icon: <MdBook className="count-icon"></MdBook>,
      bg: "aqua",
    },
    {
      id: 6,
      title: "Messages",
      subtitle: "All Messages",
      number: teachers.length,
      icon: <FaEnvelope className="count-icon"></FaEnvelope>,
    },
    {
      id: 7,
      title: "Enquiries",
      subtitle: "All Enquiries",
      number: parents.length,
      icon: <MdSettings className="count-icon"></MdSettings>,
      bg: "green",
    },
    {
      id: 8,
      title: "Guests",
      subtitle: "All Guests",
      number: hostelManagers.length,
      icon: <FaBars className="count-icon"></FaBars>,
      bg: "red",
    },
  ];
  return (
    <DashboardCountWrapper>
      <div className="container-fluid my-4">
        <div className="row">
          <Heading title="Headmaster Dashboard"></Heading>
          {data.map((item) => (
            <div
              className="col-10 col-sm-6 col-md-4 col-lg-3 mx-auto my-3"
              key={item.id}
            >
              <SingleCount {...item}></SingleCount>
            </div>
          ))}
        </div>
      </div>
    </DashboardCountWrapper>
  );
}

const DashboardCountWrapper = styled.div`
  .admin-icon {
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  .admin-heading {
    letter-spacing: 0.3rem;
  }
`;

DashboardCount.defaultProps = {
  users: [],
};