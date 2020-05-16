import React from 'react'
import MessagesHeader from './MessagesHeader'
import { MdMail } from 'react-icons/md'


export default function MessagesArea() {
    return <div className="messages-area">
        <MessagesHeader></MessagesHeader>
        <div className="messages-body text-center">
            <MdMail className="mail-icon"></MdMail>
            <p>select a message to read.</p>
        </div>
    </div>
}