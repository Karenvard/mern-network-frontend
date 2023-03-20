import React from 'react';
import Panel from "../Panel/Panel";
import Navbar from "../Navbar/Navbar";
// @ts-ignore
import classes from "./Header.module.css"
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import {useAppSelector} from "../../hooks/hooks";
import Users from "../Users/Users";
import Register from "../Register/Register";
import Dialogs from "../Dialogs/Dialogs";

const Header = () => {
    const {isAuth} = useAppSelector(state => state.authReducer)
    return <div className={classes.container}>
        <Panel/>
        {isAuth ? <div><Navbar/>
            <Routes>
                {/* @ts-ignore*/}
                <Route path={"/profile/:id"} element={<Profile/>}/>
                {/* @ts-ignore*/}
                <Route path={"/profile"} element={<Profile/>}/>
                <Route path={"/"} element={<Navigate to={"/profile"}/>}/>
                <Route path={"/users"} element={<Users/>}/>
                <Route path={"/dialogs"} element={<Dialogs/>}/>
            </Routes></div>

            : <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
            </Routes>}
        <NavLink to={"/profile"}/>
    </div>
};

export default Header;