import React from "react";
import Title from "../components/Title";

export default function ContactPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-10 col-md-6 mx-auto">
          <Title title="Contact us"></Title>
          <form className="my-4" action="#">
            {/* single input */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="names"
                placeholder="John Doe"
              />
            </div>
            {/* end of single input */}
            {/* single input */}
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="example@example.com"
              />
            </div>
            {/* end of single input */}
            {/* single input */}
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="subject"
                placeholder="subject"
              />
            </div>
            {/* end of single input */}
            {/* single input */}
            <div className="form-group">
              <textarea
                className="form-control"
                name="message"
                placeholder="Hello There."
                rows="7"
              ></textarea>
            </div>
            {/* end of single input */}
            {/* single input */}
            <div className="form-group">
              <input
                type="submit"
                className="form-control"
                name="submit"
                value="Submit"
                style={{ color: "#fff",background:"var(--primaryColor"}}
                onClick={(e) => e.preventDefault()}
              />
            </div>
            {/* end of single input */}
          </form>
        </div>
      </div>
    </div>
  );
}
