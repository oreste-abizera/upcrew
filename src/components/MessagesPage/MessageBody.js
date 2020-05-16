import React from 'react'
import styled from 'styled-components'
import { getUserNames } from '../../helpers/functions'

export default function MessageBody({ message = {}, me }) {
    const [to, setTo] = React.useState()
    const [from, setFrom] = React.useState()

    React.useEffect(() => {
        // console.log(message)
        mount()
    }, [message])

    async function mount() {
        const tempTo = await getUserNames(message.to)
        const tempFrom = await getUserNames(message.from)
        setTo(tempTo)
        setFrom(tempFrom)
    }


    return <MessageBodyWrapper>
        <h5 className="font-weight-bolder">{message.subject}</h5>
        <hr></hr>
        <p className="text-left ml-4"><span className="main-text">From: </span>{from} {message.from === me && "(me)"}</p>
        <p className="text-left ml-4"><span className="main-text">To: </span>{to} {message.to === me && "(me)"}</p>
        <p className="text-left ml-4"><span className="main-text">Sent at: </span>{message.sentAt}</p>
        <p className="text-left text-muted">{message.body}</p>

        <p className="text-right text-muted text-main">
            {message.status === "unread" && message.from === me && "Not seen"}    
            {message.status === "read" && message.from === me && "seen"}
        </p>
        
    </MessageBodyWrapper>
}

const MessageBodyWrapper = styled.div`
padding: 2rem;
`