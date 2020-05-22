import React from "react"
import styled from "styled-components"
import { MessagesContext } from "../../context/MessagesContext"
import ProfileDisplay from "./ProfileDisplay"

export default function ComposeMessage() {
    const { sendMessage, handleTo, suggestions, changeTo } = React.useContext(MessagesContext)

    const clickSuggestion = (id, value) => {
        document.getElementById("to").value = value
        changeTo(id)
    }
    return <ComposeMessageWrapper>
        <form onSubmit={sendMessage}>
            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="to">To: </label>
                    <input type="text" id="to" className="form-control" onChange={handleTo} ref={to => window.to = to} autoComplete="off"></input>

                    <div className="suggestions mt-2">
                        {suggestions.length === 0 ? "No suggestions found" :
                            suggestions.map((record, index) => <div key={index} className="suggestion-container">
                                <span className="suggestion badge" onClick={() => { clickSuggestion(record.id, record.value) }}>
                                    {record.value}
                                </span>
                                <div className="profile-popup">
                                    <ProfileDisplay user={record}></ProfileDisplay>
                                </div>
                            </div>)
                        }
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="subject">Subject: </label>
                    <input type="text" id="subject" className="form-control" ref={subject => window.subject = subject}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message: </label>
                    <textarea id="message" className="form-control" rows="6" ref={message => window.message = message}></textarea>
                </div>

                <div className="form-group">
                    <input type="submit" className="form-control btn-block btn btn-outline-success ado-btn-outline" value="Send"></input>
                </div>
            </div>
        </form>
    </ComposeMessageWrapper>
}

const ComposeMessageWrapper = styled.div`
.suggestion{
    background: var(--primaryColor);
    margin-right: 1rem;
    cursor: pointer;
}
.suggestion-container{
    display: inline-block;
    position: relative;
}
.profile-popup{
    display: none;
    position: absolute;
    top: 1.5rem;
    left: 0;
}
.suggestion-container:hover .profile-popup{
    display: inline-block;
}
`