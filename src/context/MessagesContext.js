import React from "react";
import { getMessages } from "../helpers/functions";
const MessagesContext = React.createContext();

function MessagesProvider({ children }) {
    const [messages, setMessages] = React.useState([]);
    const [activeMessage, setActiveMessage] = React.useState(getActiveMessageFromSessionStorage)

    React.useEffect(() => {
        mount();
    }, []);

    async function mount() {
        let tempMessages = await getMessages()
        setMessages(tempMessages)
    }

    function getActiveMessageFromSessionStorage() {
        return sessionStorage.getItem("currentMessage") ? JSON.parse(sessionStorage.getItem("currentMessage")) : ""
    }

    function syncActiveMessageToSessionStorage(item) {
        sessionStorage.setItem("currentMessage", JSON.stringify(item))
        setActiveMessage(getActiveMessageFromSessionStorage())
    }
    return (
        <MessagesContext.Provider
            value={{
                messages,
                activeMessage,
                syncActiveMessageToSessionStorage
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
}

export { MessagesContext, MessagesProvider };
