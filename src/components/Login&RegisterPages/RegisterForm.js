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
        alert,
        changeTouched,
        touched,
    } = React.useContext(AdoContext);
    if (isMember) {
        setTimeout(() => {
            changeIsMember(false);
        }, 0);
    }
    let isEmpty =
        !firstName || !lastName || !userName || !email || !password || !confirmPass;
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
                                    isEmpty || !match || alert.show || password.length < 6 || !agree
                                }
                                style={
                                    isEmpty || !match || alert.show || password.length < 6 || !agree
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

const RegisterFormWrapper = styled.div`
`;
