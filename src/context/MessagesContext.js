import React from "react";
import { getMessages } from "../helpers/functions";
import { UserContext } from "./UserContext";
const MessagesContext = React.createContext();

function MessagesProvider({ children }) {
    const { users } = React.useContext(UserContext)
    const [messages, setMessages] = React.useState([]);
    const [activeMessage, setActiveMessage] = React.useState(getActiveMessageFromSessionStorage)
    const [to, setTo] = React.useState()
    const [suggestions, setSuggestions] = React.useState([])

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


    function getSuggestions(name) {
        let tempUsers = users.filter(record => {
            let fname = record.firstName
            let lname = record.lastName
            let concat1 = `${fname} ${lname}`.toLowerCase()
            let concat2 = `${lname} ${fname}`.toLowerCase()

            let slice1 = concat1.slice(0, name.length)
            let slice2 = concat2.slice(0, name.length)

            return slice1 === name.toLowerCase() || slice2 === name.toLowerCase()
        })

        let response = []
        for (let i = 0; i < tempUsers.length; i++) {
            const value = `${tempUsers[i].firstName} ${tempUsers[i].lastName}`
            const id = tempUsers[i].id
            response = [...response, {
                id,
                value
            }]
        }

        return response
    }

    function handleTo(e) {
        let response = []
        const tempTo = e.target.value
        if (tempTo !== "") {
            response = getSuggestions(tempTo)
        }
        setSuggestions(response)
    }


    function changeTo(id) {
        setTo(id)
    }

    function sendMessage(e) {
        e.preventDefault()
        let tempTo
        let name = window.to.value
        let subject = window.subject.value
        let message = window.message.value
        console.log("sending message to " + name)
        console.log(subject)
        console.log(message);

        let clickedUser = users.find(record => {
            return (`${record.firstName} ${record.lastName}` === name || `${record.lastName} ${record.firstName}` === name) && record.id === to
        })
        if (clickedUser) {
            console.log(to + name)
            tempTo = to
        } else {
            let typedUser = users.find(record => {
                return `${record.firstName} ${record.lastName}` === name || `${record.lastName} ${record.firstName}` === name
            })
            if (typedUser) {
                console.log(typedUser)
                tempTo = typedUser.id
            }
        }

        console.log(`final to = ${tempTo}`)
    }
    return (
        <MessagesContext.Provider
            value={{
                messages,
                activeMessage,
                syncActiveMessageToSessionStorage,
                handleTo,
                sendMessage,
                suggestions,
                changeTo
            }}
        >
            {children}
        </MessagesContext.Provider>
    );
}

export { MessagesContext, MessagesProvider };
