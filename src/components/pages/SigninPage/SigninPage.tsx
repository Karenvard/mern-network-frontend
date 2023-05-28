import React, { FC, useState } from 'react';
// @ts-ignore
import classes from "./SigninPage.module.scss"
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks';
import { authThunks } from '../../../store/Thunks';

const SigninPage: FC = () => {
    const dispatch = useAppDispatch();
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [rememberMeInput, setRememberMeInput] = useState<boolean>(false);

    function signinHandler() {
        if (passwordInput && usernameInput) {
            dispatch(authThunks.signin({username: usernameInput, password: passwordInput, rememberMe: rememberMeInput}));
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <div>
                    <span>Username</span>
                    <input onChange={e => setUsernameInput(e.target.value)} type="text" /> 
                    <br />
 
                    <span>Password</span>
                    <input onChange={e => setPasswordInput(e.target.value)} type="password" />
                </div>
                <section className={classes.rememberMe}><input onClick={(e: any) => setRememberMeInput(e.target.checked)} type="checkbox" /> <span>Remember me</span></section> <br />
                <div onClick={signinHandler} className={classes.loginBtn}>Sign in</div>
                <span className={classes.Msg}>Have you not signed up yet? - <NavLink to="/signup">Sign up</NavLink></span>
            </div>
        </div>
    );
}

export default SigninPage;
