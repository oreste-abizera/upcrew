import React from 'react'
import { UserContext } from "../../context/UserContext";
import { MessagesContext } from "../../context/MessagesContext"
import { MdArrowDropDown, MdCreate, MdClose } from "react-icons/md";
import ChatListItem from './ChatListItem';
import Modal from '../Modal'
import Loader from "../Loader"

export default function ChatList({ closeSide, syncActiveMessageToSessionStorage }) {
    const { messages } = React.useContext(MessagesContext)
    const { user } = React.useContext(UserContext)
    const [myMessages, setMyMessages] = React.useState([])


    React.useEffect(() => {
        let { id } = user.user
        let tempMessages = messages.filter(record => record.to === id || record.from === id)
        setMyMessages(tempMessages)
    }, [messages, user])


    return <div className="messages-list">
        <MdClose className="close-btn" onClick={closeSide}></MdClose>
        <div className="profile-section container-fluid row">
            <div className="col-md-5">
                <span className="profile-logo">UPCREW <MdArrowDropDown className="profile-icon"></MdArrowDropDown></span>
                <p className="userName">{user.username}</p>
            </div>
            <div className="col-12 col-md-6">
                <Modal opener={true} header="Compose new Message" body={Wrapper}>
                    <div className="input-group">
                        <input
                            type="button"
                            className="form-control d-none d-md-block"
                            value="Compose"
                        ></input>
                        <div className="input-group-append append">
                            <div className="input-group-text text-white">
                                <MdCreate></MdCreate>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>

        </div>

        <hr></hr>
        <ul className="chat-list">
            {myMessages.length === 0 && <><Loader></Loader>
                <p className="text-center text-white">Messages loading...</p>
            </>}
            {myMessages.map(record => <ChatListItem key={record.id} message={record} me={user.user.id} syncActiveMessageToSessionStorage={syncActiveMessageToSessionStorage}></ChatListItem>)}
        </ul>
    </div>
}


const Wrapper = <div>
    <p>my new Modal</p>
</div>