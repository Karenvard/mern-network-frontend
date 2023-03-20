import React from 'react';
// @ts-ignore
import UserIcon from "../../assets/userIcon.png"
import {Button} from "antd";
// @ts-ignore
import classes from "./Users.module.css"
import {useAppDispatch} from "../../hooks/hooks";
import {IProfile} from "../../models/IProfile";
import {usersThunks} from "../../store/Thunks";
import {NavLink} from "react-router-dom";

const User = (props: IProfile) => {
    const dispatch = useAppDispatch();
    function Follow() {
        if (props.userId) {
            dispatch(usersThunks.followUser(props.userId))
        }
    }
    function UnFollow() {
        if (props.userId) {
            dispatch(usersThunks.unFollowUser(props.userId))
        }
    }
    return <div className={classes.userContainer}>
        <img className={classes.userPhoto} src={props.photos.small || UserIcon} alt=""/>
        <NavLink to={`/profile/${props.userId}`}><h3>{props.name}</h3></NavLink>
        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A impedit tenetur vitae voluptas? Accusamus aut consequuntur</span> <br/>
        <span>{props.status}</span> <br/>
        {props.followed
            ? <Button onClick={UnFollow}>Unfollow</Button>
            : <Button onClick={Follow} type={"primary"}>Follow</Button>}
    </div>
};

export default User;