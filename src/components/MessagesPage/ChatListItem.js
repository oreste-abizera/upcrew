import React from "react"
import styled from "styled-components"

export default function ChatListItem({ message, me, syncActiveMessageToSessionStorage }) {
    const { id, subject, to } = message
    let screenSubject = subject
    if (screenSubject.length > 25) {
        screenSubject = screenSubject.slice(0, 25) + "..."
    }
    return <ChatListItemWrapper onClick={() => {
        syncActiveMessageToSessionStorage(id)
    }}>
        <span className="text-muted">{screenSubject} {to === me && "(to me)"}</span>
        {message.status === "unread" && to === me && <span className="text-white status badge">new</span>}
    </ChatListItemWrapper>
}

const ChatListItemWrapper = styled.li`
cursor: pointer;
margin: 0.3rem 0;
padding: 0.3rem;
:hover{
    background: var(--darkGrey);
}
.status{
    background: var(--mainRed);
}
`