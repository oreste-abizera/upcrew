import React from "react";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

export default function Heading({ title }) {
  return (
    <div className="col-12 d-flex mt-4">
      <FaRegArrowAltCircleRight className="main-icon"></FaRegArrowAltCircleRight>
      <h5 className="main-heading">{title}</h5>
    </div>
  );
}

Heading.defaultProps = {
  title: "Default Heading",
};
