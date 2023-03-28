import React from 'react';
// @ts-ignore
import classes from "./Panel.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import {authThunks} from "../../store/Thunks";

const Panel = () => {
    const dispatch = useAppDispatch();
    const {isAuth} = useAppSelector(state => state.authReducer)
    const login = useAppSelector(state => {
        return state.authReducer.profile.login
    });
    function Logout() {
        dispatch(authThunks.logout())
    }

    return <div className={isAuth ? classes.containerLogedIn : classes.containerLogedOut}>
        {isAuth
            ? <div><span className={classes.userName}>{login}</span> <Button className={classes.logout} onClick={Logout}>Logout</Button></div>
            : <NavLink to={"/login"}><Button className={classes.login} type={"primary"}>Login</Button></NavLink>}
    </div>
};

export default Panel;