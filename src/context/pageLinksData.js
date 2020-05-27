import React from "react";
import {
  MdDashboard,
  MdAssignment,
  MdAssignmentReturned,
  MdMessage,
} from "react-icons/md";
import {
  FaGraduationCap,
  FaChalkboardTeacher,
  FaList,
  FaBook,
  FaRegCalendarTimes,
  FaEnvelopeOpenText,
} from "react-icons/fa";
export default [
  {
    id: 1,
    url: "/dashboard",
    icon: <MdDashboard className="pagelink-icon"></MdDashboard>,
    text: "Dashboard",
    type: "all",
  },
  {
    id: 2,
    url: "/students",
    icon: <FaGraduationCap className="pagelink-icon"></FaGraduationCap>,
    text: "Students",
    type: "headmaster",
  },
  {
    id: 3,
    url: "/teachers",
    icon: <FaChalkboardTeacher className="pagelink-icon"></FaChalkboardTeacher>,
    text: "Teachers",
    type: "headmaster",
  },
  {
    id: 4,
    url: "/classes",
    icon: <FaList className="pagelink-icon"></FaList>,
    text: "Classes",
    type: "all",
  },
  {
    id: 5,
    url: "/assignments",
    icon: <MdAssignment className="pagelink-icon"></MdAssignment>,
    text: "Assignments",
    type: "all",
  },
  {
    id: 6,
    url: "/results",
    icon: (
      <MdAssignmentReturned className="pagelink-icon"></MdAssignmentReturned>
    ),
    text: "Results",
    type: "student",
  },
  {
    id: 8,
    url: "/exams",
    icon: <FaEnvelopeOpenText className="pagelink-icon"></FaEnvelopeOpenText>,
    text: "Exams",
    type: "all",
  },

  {
    id: 9,
    url: "/messages",
    icon: <MdMessage className="pagelink-icon"></MdMessage>,
    text: "Messages",
    type: "all",
  },
  {
    id: 7,
    url: "/timetable",
    icon: <FaRegCalendarTimes className="pagelink-icon"></FaRegCalendarTimes>,
    text: "Timetable",
    type: "all",
  },
  {
    id: 10,
    url: "/books",
    icon: <FaBook className="pagelink-icon"></FaBook>,
    text: "Library Books",
    type: "all",
  },
];
