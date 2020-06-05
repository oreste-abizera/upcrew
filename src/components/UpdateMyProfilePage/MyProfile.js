import React from 'react'

export default function MyProfile({ user, handleSubmit }) {
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <h1 className="main-text mb-5">Update my profile</h1>
            </div>
            <div className="form-group">
                <label htmlFor="firstName">First name</label>
                <input defaultValue={user.firstName} type="text" id="firstName" className="form-control" ref={fname => window.fname = fname}></input>
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last name</label>
                <input defaultValue={user.lastName} type="text" id="lastName" className="form-control" ref={lname => window.lname = lname}></input>
            </div>


            <div className="form-group">
                <label htmlFor="userName">Username</label>
                <input defaultValue={user.userName} type="text" id="userName" className="form-control" ref={username => window.username = username}></input>
            </div>


            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input defaultValue={user.userEmail} type="email" id="email" className="form-control" ref={email => window.email = email}></input>
            </div>

            <div className="form-group">
                <label htmlFor="dob">Date of birth</label>
                <input defaultValue={user.dateOfBirth} type="text" id="dob" className="form-control" ref={dob => window.dob = dob}></input>
            </div>

            <div className="form-group">
                <label htmlFor="phoneNumber">Phone number</label>
                <input defaultValue={user.phoneNumber} type="tel" id="phoneNumber" className="form-control" ref={phoneNumber => window.phoneNumber = phoneNumber}></input>
            </div>

            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input defaultValue={user.userCountry} type="text" id="country" className="form-control" ref={country => window.country = country}></input>
            </div>

            <div className="form-group">
                <input type="submit" value="Save Changes" className="form-control ado-btn-outline"></input>
            </div>
        </form>
    )
}
