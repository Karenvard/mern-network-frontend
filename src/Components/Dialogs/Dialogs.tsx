import React, {useEffect, useState} from 'react';
// @ts-ignore
import classes from "./Dialogs.module.css"
import {useAppSelector} from "../../hooks/hooks";

const Dialogs = () => {
    const [messages, setMessages] = useState<string[]>(["Hi", "hello"]);
    const [message, setMessage] = useState('');
    const {profile} = useAppSelector(state => state.authReducer)
    const socket = new WebSocket("wss://mern-network.onrender.com")
    useEffect(() => {
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "connection",
                chatID: "nuka"
            }))
        }

        socket.onmessage = (event) => {
            setMessages(prev => [...prev, JSON.parse(event.data)])
        }
    }, [])

    function sendMessage() {
        socket.send(JSON.stringify({
            type: "message",
            chatID: "nuka",
            username: profile.name,
            message
        }))
    }
    return (
        <div className={classes.container}>
            <div>
                <input value={message} onChange={e => setMessage(e.target.value)} type="text"/> <br/>
                <button onClick={sendMessage}>Send</button>
            </div>
            {messages.map(m => <h3>{m}</h3>)}
        </div>
    );
};

export default Dialogs;
