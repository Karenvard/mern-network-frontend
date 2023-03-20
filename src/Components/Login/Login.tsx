import React, {useState} from 'react';
// @ts-ignore
import classes from "./Login.module.css"
import {Button, Checkbox, Input, Tooltip} from "antd";
import {UserOutlined, EyeInvisibleOutlined, InfoCircleOutlined, EyeOutlined, LockOutlined} from "@ant-design/icons"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate, NavLink} from "react-router-dom";
import {authThunks} from "../../store/Thunks";

const Login = () => {
    const dispatch = useAppDispatch();
    const {error, isAuth} = useAppSelector(state => state.authReducer)
    const [isVisible, setVisibility] = useState(false)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)

    function Login() {
        if (login && password) {
            dispatch(authThunks.login({login, password, rememberMe}))
        }
    }

    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return <div className={classes.container}>
        {error ? <h1>{error.body}</h1> : null}
        <div className={classes.form}>
            <Input
                onChange={e => setLogin(e.target.value)}
                className={classes.input}
                placeholder="Email"
                prefix={<UserOutlined/>}
                suffix={
                    <Tooltip title="Enter your email">
                        <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                    </Tooltip>}/> <br/>

            <Input
                onChange={e => setPassword(e.target.value)}
                className={classes.input}
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                prefix={<LockOutlined/>}
                suffix={
                    <Tooltip title={isVisible ? "Hide password" : "Show password"}>
                        {isVisible
                            ? <EyeOutlined onClick={() => setVisibility(false)}/>
                            : <EyeInvisibleOutlined onClick={() => setVisibility(true)}/>}
                    </Tooltip>}/> <br/>

            <Checkbox onChange={e => setRememberMe(e.target.checked)} className={classes.input}>Remember me</Checkbox>
            <br/> <br/> <br/>
            <Button type={"primary"} onClick={Login} className={classes.login}>Login</Button> <br/> <br/> <br/>
            <span className={classes.nrText}>Not registered?</span> - <Button className={classes.nrBtn}><NavLink to={"/register"}>Register</NavLink></Button>
        </div>
    </div>
};

export default Login;