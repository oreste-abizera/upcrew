import React from 'react'

export default function UpdatePassword({ handleSubmit }) {
    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <h1 className="main-text mb-5">Change Password</h1>
            </div>
            <div className="form-group">
                <label htmlFor="cpass">Current Password</label>
                <input type="password" id="cpass" className="form-control" ref={currentPassword => window.currentPassword = currentPassword} required></input>
            </div>

            <div className="form-group">
                <label htmlFor="npass">new Password</label>
                <input type="password" id="npass" className="form-control" ref={newPassword => window.newPassword = newPassword} required></input>
            </div>

            <div className="form-group">
                <input type="submit" value="Change Password" className="form-control ado-btn-outline"></input>
            </div>
        </form>
    )
}
