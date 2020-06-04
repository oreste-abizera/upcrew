import React from "react"
import styled from "styled-components"

export default function EditUser({ user }) {
    return <EditUserWrapper>
        <div className="container">
            <form className="col-10 form-container">
                {/* single input */}
                <div className="form-group">
                    <label htmlFor={`fname${user.id}`}>First name</label>
                    <input type="text" className="form-control" id={`fname${user.id}`} defaultValue={user.firstName}></input>
                </div>
                {/* end of single input */}

                {/* single input */}
                <div className="form-group">
                    <label htmlFor={`lname${user.id}`}>Last name</label>
                    <input type="text" className="form-control" id={`lname${user.id}`} defaultValue={user.lastName}></input>
                </div>
                {/* end of single input */}

                {/* single input */}
                <div className="form-group">
                    <label htmlFor={`username${user.id}`}>Username</label>
                    <input type="text" className="form-control" id={`username${user.id}`} defaultValue={user.userName}></input>
                </div>
                {/* end of single input */}

                {/* single input */}
                <div className="form-group">
                    <label htmlFor={`dob${user.id}`}>Date of birth</label>
                    <input type="date" className="form-control" id={`dob${user.id}`} defaultValue={user.dateOfBirth}></input>
                </div>
                {/* end of single input */}

                {/* single input */}
                <div className="form-group">
                    <label htmlFor={`email${user.id}`}>Email</label>
                    <input type="email" className="form-control" id={`email${user.id}`} defaultValue={user.userEmail}></input>
                </div>
                {/* end of single input */}

                {/* single input */}
                <div className="form-group">
                    <label htmlFor={`country${user.id}`}>Country</label>
                    <input type="text" className="form-control" id={`country${user.id}`} defaultValue={user.userCountry}></input>
                </div>
                {/* end of single input */}

                {/* single input */}
                <div className="form-group">
                    <img src={user.image || "/assets/images/avatar.jpg"} alt={user.userName} className="img img-fluid" width="100" height="100"></img>
                    <input type="file" className="form-control" id={`image${user.id}`}></input>
                </div>
                {/* end of single input */}

                {/* submit */}
                <div className="form-group">
                    <input type="submit" value="save changes" className="btn btn-block ado-btn-outline"></input>
                </div>
                {/* end of submit */}
            </form>
        </div>
    </EditUserWrapper >
}

const EditUserWrapper = styled.div``