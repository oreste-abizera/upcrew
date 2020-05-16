import React from "react";
import { getMessages } from "../helpers/functions";
const MessagesContext = React.createContext();

function MessagesProvider({ children }) {
    const [messages, setMessages] = React.useState([]);


    React.useEffect(() => {
        mount();
    }, []);

    async function mount() {
        let tempMessages = await getMessages()
        setMessages(tempMessages)
    }
    return (
        <MessagesContext.Provider
            value={{
                messages
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
}

export { MessagesContext, MessagesProvider };
