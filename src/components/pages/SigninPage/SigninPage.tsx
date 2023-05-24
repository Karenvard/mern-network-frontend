import React, { FC, useState } from 'react';
// @ts-ignore
import classes from "./SigninPage.module.scss"
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks';
import { authThunks } from '../../../store/Thunks';

const LoginPage: FC = () => {
    const dispatch = useAppDispatch();
    const [loginInput, setLoginInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [rememberMeInput, setRememberMeInput] = useState<boolean>(false);

    function loginHandler() {
        if (passwordInput && loginInput) {
            dispatch(authThunks.login({login: loginInput, password: passwordInput, rememberMe: rememberMeInput}));
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <div>
                    <span>Login</span>
                    <input onChange={e => setLoginInput(e.target.value)} type="text" /> 
                    <br />
 
                    <span>Password</span>
                    <input onChange={e => setPasswordInput(e.target.value)} type="password" />
                </div>
                <section className={classes.rememberMe}><input onClick={(e: any) => setRememberMeInput(e.target.checked)} type="checkbox" /> <span>Remember me</span></section> <br />
                <div onClick={loginHandler} className={classes.loginBtn}>Login</div>
                <span className={classes.Msg}>Have you not registered yet? - <NavLink to="/register">Register</NavLink></span>
            </div>
        </div>
    );
}

export default LoginPage;
