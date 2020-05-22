import React from "react"
import styled from "styled-components"


export default function NewTeacher() {
    const addStudent = (e) => {
        e.preventDefault()
        console.log(window.username)
    }
    return <NewTeacherWrapper>
        <form className="form-container my-4 col-md-9 mx-auto" onSubmit={addStudent}>
            <div className="form-group">
                <label htmlFor="fname">First name</label>
                <input type="text" className="form-control" id="fname" required ref={fname => window.fname = fname}></input>
            </div>

            <div className="form-group">
                <label htmlFor="lname">Last name</label>
                <input type="text" className="form-control" id="lname" required ref={lname => window.lname = lname}></input>
            </div>

            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" id="username" required ref={username => window.username = username}></input>
            </div>

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" id="email" required ref={email => window.email = email}></input>
            </div>


            <div className="form-group">
                <label htmlFor="dob">Date of birth</label>
                <input type="date" className="form-control" id="dob" ref={dob => window.dob = dob}></input>
            </div>

            <div className="form-group">
                <label htmlFor="country">country</label>
                <input type="text" className="form-control" id="country" ref={country => window.country = country}></input>
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone number</label>
                <input type="text" className="form-control" id="phone" ref={phoneNumber => window.phoneNumber = phoneNumber}></input>
            </div>


            <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select className="form-control" id="gender" required ref={gender => window.gender = gender}>
                    <option value="">select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>


            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" required ref={password => window.password = password}></input>
            </div>

            <div className="form-group">
                <input type="submit" value="Save teacher" className="form-control btn btn-block ado-btn-outline"></input>
            </div>
        </form>
    </NewTeacherWrapper>
}

const NewTeacherWrapper = styled.div``