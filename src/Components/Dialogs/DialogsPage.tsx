import React, {FC, useEffect, useState} from 'react';
import { usersAPI } from '../../api/api';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { usersThunks } from '../../store/Thunks';
import Dialogs from './Dialogs';
// @ts-ignore
import classes from "./Dialogs.module.css"
// @ts-ignore
import UserIcon from "../../assets/userIcon.png"
import { IProfile } from '../../models/IProfile';
import { IChat } from '../../models/IChat';


const DialogsPage: FC = () => {
  const dispatch = useAppDispatch();
  const {profile} = useAppSelector(state => state.authReducer)
  const {chats, convPartners} = useAppSelector(state => state.usersReducer)
  const [activeChat, setActiveChat] = useState<IChat>();
  const [activePartner, setActivePartner] = useState<IProfile>(convPartners[0]);

  function chooseChat(partner: IProfile) {
    setActivePartner(partner);
    for (let i = 0; i <= chats.length - 1; i++) {
        if (chats[i].persons[0].userId === partner.userId) {
          setActiveChat(chats[i]);
        } else if (chats[i].persons[1].userId === partner.userId) {
          setActiveChat(chats[i]);
        }
    }
  }

  useEffect(() => {
    dispatch(usersThunks.getChats());
    chooseChat(activePartner)
  }, [])

  return <div className={classes.container}>
          <div>
            {convPartners.map(partner => <div onClick={e => chooseChat(partner)}>
              <img className={classes.img} src={partner.photos.small || UserIcon} alt=""/>
              <span>{partner.name}</span>
            </div>)}
          </div>

          <div>
            {activeChat && activePartner 
            ? <Dialogs partner={activePartner as IProfile} chat={activeChat as IChat}/>
            : "Not choosed yet"}
            
          </div>
        </div>
}

export default DialogsPage;