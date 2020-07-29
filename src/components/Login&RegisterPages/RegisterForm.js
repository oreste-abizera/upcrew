import React from "react";
import styled from "styled-components";
import { AdoContext } from "../../context/context";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaUserCheck,
  FaUserMd,
  FaMailBulk,
  FaBirthdayCake,
  FaTransgender,
  FaHome,
} from "react-icons/fa";

export default function RegisterForm() {
  const {
    handleSubmit,
    handleChange,
    changeIsMember,
    isMember,
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPass,
    agree,
    gender,
    dateOfBirth,
    country,
    alert,
    changeTouched,
    touched,
  } = React.useContext(AdoContext);
  if (isMember) {
    setTimeout(() => {
      changeIsMember(false);
    }, 0);
  }
  let isEmpty = false;
  // !firstName || !lastName || !userName || !email || !password || !confirmPass || !gender || !dateOfBirth || !country;
  let match = password === confirmPass;
  return (
    <RegisterFormWrapper>
      <div className="container">
        <div className="row">
          <form
            className="register-form col-10 col-md-8 col-lg-5 mx-auto mt-5 mb-3"
            onSubmit={handleSubmit}
          >
            <h1>Register</h1>
            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaUser></FaUser>
                </div>
              </div>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={firstName}
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaUserMd></FaUserMd>
                </div>
              </div>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaUserCheck></FaUserCheck>
                </div>
              </div>
              <input
                autoComplete="off"
                type="text"
                className="form-control"
                placeholder="Username"
                name="userName"
                value={userName}
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaMailBulk></FaMailBulk>
                </div>
              </div>
              <input
                autoComplete="off"
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaHome></FaHome>
                </div>
              </div>
              <select
                className="form-control"
                name="country"
                value={country}
                onChange={handleChange}
              >
                <option value="">select your country</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Kenya">Kenya</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Egypt">Egypt</option>
                <option value="Senegal">Senegal</option>
                <option value="England">England</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Denmark">Denmark</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="Colombia">Colombia</option>
              </select>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaBirthdayCake></FaBirthdayCake>
                </div>
              </div>
              <input
                autoComplete="off"
                type="date"
                className="form-control"
                placeholder="Date of birth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaTransgender></FaTransgender>
                </div>
              </div>
              <select
                className="form-control"
                name="gender"
                value={gender}
                onChange={handleChange}
              >
                <option value="">select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaLock></FaLock>
                </div>
              </div>
              <input
                autoComplete="off"
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              ></input>
            </div>

            <div className="input-group">
              <div className="input-group-prepend">
                <div className="input-group-text text-white">
                  <FaLock></FaLock>
                </div>
              </div>
              <input
                autoComplete="off"
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="confirmPass"
                value={confirmPass}
                onChange={handleChange}
              ></input>
            </div>

            <div className="form-group">
              {agree ? (
                <label className="text-muted">
                  Thanks For accepting the agreement of Upcrew School. You can
                  now Signup.
                </label>
              ) : (
                <div>
                  <label className="text-muted" htmlFor="agree">
                    Do you agree to our terms and services
                  </label>
                  <input
                    type="checkbox"
                    name="agree"
                    checked={agree}
                    onChange={handleChange}
                    required
                    id="agree"
                  ></input>
                </div>
              )}
            </div>

            <h6
              className={
                isEmpty || !match || password.length < 6 || !agree
                  ? "pb-2 text-muted error"
                  : alert.show
                  ? "pb-2 text-muted success"
                  : "d-none"
              }
            >
              {!touched.register
                ? ""
                : isEmpty
                ? "Please Fill All Fields"
                : password.length < 6
                ? "Password must be at least 6 characters long"
                : !match
                ? "Passwords do not match"
                : !agree
                ? "Please Agree our terms and services"
                : "Please Wait..."}
            </h6>

            <div
              className="form-group"
              onMouseEnter={() => {
                changeTouched("register");
              }}
            >
              <input
                type="submit"
                value="Signup"
                className="form-control"
                disabled={
                  isEmpty ||
                  !match ||
                  alert.show ||
                  password.length < 6 ||
                  !agree
                }
                style={
                  isEmpty ||
                  !match ||
                  alert.show ||
                  password.length < 6 ||
                  !agree
                    ? { cursor: "not-allowed" }
                    : {}
                }
              ></input>
            </div>
            <div>
              <p className="text-muted">
                Already registered?{" "}
                <Link to="/login" className="text-link">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </RegisterFormWrapper>
  );
}

const RegisterFormWrapper = styled.div``;
