import React from 'react'
import MessagesHeader from './MessagesHeader'
import { MdMail } from 'react-icons/md'
import MessageBody from './MessageBody'


export default function MessagesArea({ activeMessage, messages = [], me }) {
    const message = messages.find(record => record.id === activeMessage)
    return <div className="messages-area">
        <MessagesHeader></MessagesHeader>
        <div className="messages-body text-center">
            {!message ? <>
                <MdMail className="mail-icon"></MdMail>
                <p>select a message to read.</p>
            </> : <MessageBody message={message} me={me}></MessageBody>}

        </div>
    </div>
}