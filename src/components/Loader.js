import React from "react";
import loader from "../assets/images/loader.gif";

export default function Loader({ text, center = true }) {
  let css;
  if (center) {
    css = "container text-center";
  } else {
    css = "container";
  }
  return (
    <div className={css}>
      <img src={loader} alt="Loader"></img>
      <p>{text}</p>
    </div>
  );
}
