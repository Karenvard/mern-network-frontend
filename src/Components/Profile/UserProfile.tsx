import React from 'react';
// @ts-ignore
import classes from "./Profile.module.css";
// @ts-ignore
import HeaderIcon from "../../assets/header.webp";
// @ts-ignore
import UserIcon from "../../assets/userIcon.png";
import {IError} from "../../models/IError";
import {IProfile} from "../../models/IProfile";

interface IProps {
    error: IError
    currentUser: IProfile
}

const UserProfile = (props: IProps) => {

    return <div className={classes.container}>
        <img src={props.currentUser.photos.large || HeaderIcon} className={classes.headerIMG} alt=""/>
        <div className={classes.profileInfo}>
            {props.error.body || null}
            <div>
                <img src={props.currentUser.photos.small || UserIcon} className={classes.profilePhoto} alt=""/> <br/>
                <br/>
            </div>
            <div>
                <h1 className={classes.about}>{props.currentUser.name}</h1>
                <h3 className={classes.about}>{props.currentUser.status || "------"}</h3> <br/>
                <p>{props.currentUser.aboutMe}</p>
            </div>
        </div>
    </div>
};

export default UserProfile;