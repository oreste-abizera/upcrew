import React from 'react'
import MessagesHeader from './MessagesHeader'
import { MdMail } from 'react-icons/md'
import MessageBody from './MessageBody'


export default function MessagesArea({ activeMessage, messages = [], me }) {
    let message = messages.find(record => record.id === activeMessage)
    if (message) {
        if (me !== message.from && me !== message.to) {
            message = undefined
        }
    }
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