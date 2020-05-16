import React from 'react'

export default function MessagesHeader() {
    return <div className="messages-header mt-3">
        <div className="d-flex justify-around">
            <div className="col font-weight-bolder text-dark">Messages</div>
            <input type="text" className="form-control col-6 col-md-3" placeholder="Search message"></input>
        </div>
        <hr></hr>
    </div>
}