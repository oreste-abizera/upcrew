import React from "react";
import Title from "../../components/Title";
import {Link} from 'react-router-dom'

export default function Info({ img }) {
  return (
    <>
      <div className="my-1">
        <p style={{color:"var(--mainGrey)"}}>About Upcrew</p>
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-10 col-sm-8 col-md-6 mx-auto my-3">
            <img src={img} alt="About Upcrew Logo" className="img-fluid"></img>
          </div>
          <div className="col-10 col-sm-8 col-md-6 mx-auto my-3">
            <Title title="About us"></Title>
            <p className="pt-5 text-left">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
              laborum tempora, fugiat, ipsa itaque earum quisquam culpa sed
              rerum repellat nihil illo corporis? Vitae neque consequuntur
              corrupti autem. Veritatis accusamus voluptatem provident sapiente
              impedit praesentium numquam harum! Nisi, perspiciatis possimus?
            </p>
            <Link to="/about" className="ado-btn">
              Read More
            </Link>
          </div>
        </div>
      </div>
      </>
  );
}