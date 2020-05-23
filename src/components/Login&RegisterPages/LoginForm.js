import React from "react";
import styled from "styled-components";
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AdoContext } from "../../context/context";

export default function LoginForm() {
    const {
        handleSubmit,
        handleChange,
        changeIsMember,
        isMember,
        userName,
        password,
        alert,
        changeTouched,
        touched,
    } = React.useContext(AdoContext);
    if (!isMember) {
        setTimeout(() => {
            changeIsMember(true);
        }, 0);
    }

    const isEmpty = !userName || !password;
    return (
        <LoginFormWrapper>
            <div className="container">
                <div className="row">
                    <form
                        className="login-form col-10 col-md-8 col-lg-5 mx-auto mt-5"
                        onSubmit={handleSubmit}
                    >
                        <h1>Login</h1>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text text-white">
                                    <FaUser></FaUser>
                                </div>
                            </div>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username or Email"
                                name="userName"
                                value={userName}
                                onChange={handleChange}
                                autoComplete="off"
                            ></input>
                        </div>

                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text text-white">
                                    <FaLock></FaLock>
                                </div>
                            </div>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                autoComplete="off"
                            ></input>
                        </div>

                        <h6
                            className={
                                isEmpty
                                    ? "pb-2 text-muted error"
                                    : alert.show
                                        ? "pb-2 text-muted success"
                                        : "d-none"
                            }
                        >
                            {!touched.login
                                ? ""
                                : isEmpty
                                    ? "Please Fill All Fields"
                                    : alert.show
                                        ? "Please Wait..."
                                        : ""}
                        </h6>

                        <div
                            className="form-group"
                            onMouseEnter={() => {
                                changeTouched("login");
                            }}
                        >
                            <input
                                type="submit"
                                value="Login"
                                className="form-control"
                                disabled={isEmpty || alert.show}
                                style={isEmpty || alert.show ? { cursor: "not-allowed" } : {}}
                            ></input>
                        </div>
                        <div>
                            <p className="text-muted">
                                Not registered?{" "}
                                <Link to="/register" className="text-link">
                                    Create an account
                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </LoginFormWrapper>
    );
}

const LoginFormWrapper = styled.div``;
