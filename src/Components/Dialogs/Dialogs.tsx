import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
// @ts-ignore
import classes from "./Dialogs.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import { IChat } from '../../models/IChat';
import { IProfile } from '../../models/IProfile';
import { usersAPI } from '../../api/api';
import { IMessage } from '../../models/IMessage';

interface IProps {
    chat: IChat
    partner: IProfile
}

const Dialogs: FC<IProps> = (props) => {
    const dispatch = useAppDispatch();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [message, setMessage] = useState('');
    const {profile} = useAppSelector(state => state.authReducer)
    const socket = new WebSocket("wss://mern-network.onrender.com");
    useEffect(() => {
    setMessages(props.chat.messages)
        
        socket.onopen = () => {
            socket.send(JSON.stringify({
                type: "connection",
                chatID: props.chat._id
            }))
        }

        socket.onmessage = (event) => {
            console.log(event.data)
            setMessages(prev => [...prev, JSON.parse(event.data)])
        }
    }, [props.chat])

    async function sendMessage() {
        socket.send(JSON.stringify({
            type: "message",
            chatID: props.chat._id,
            senderProfile: profile,
            message
        }))

        await usersAPI.sendMessage(props.chat, message);
    }
    return (
        <div className={classes.container}>
            <div>
                <input value={message} onChange={e => setMessage(e.target.value)} type="text"/> <br/>
                <span>Current partner: {props.partner ? props.partner.name : "Ny lan"}</span>
                <button onClick={sendMessage}>Send</button>
            </div>
            {messages.map(m => <div><span className={m.SenderID === profile.userId ? classes.myMessage : classes.partnerMessage}>{m.text}</span> <br /></div>)}
        </div>
    );
};

export default Dialogs;
