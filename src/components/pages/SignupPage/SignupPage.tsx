import React, { FC, useState } from 'react';
// @ts-ignore
import classes from "./SignupPage.module.scss"
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks';
import {authThunks} from '../../../store/Thunks';

const RegisterPage: FC = () => {
    const dispatch = useAppDispatch();
    const [loginInput, setLoginInput] = useState<string>('');
    const [nameInput, setNameInput] = useState<string>('');
    const [surnameInput, setSurnameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [repeatPasswordInput, setRepeatPasswordInput] = useState<string>('');
    const [agreePolicyInput, setAgreePolicyInput] = useState<boolean>(false);

    function registerHandler() {
        if (passwordInput === repeatPasswordInput && agreePolicyInput === true) {
            dispatch(authThunks.register({login: loginInput, password: passwordInput, name: nameInput, surname: surnameInput}));
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <div>
                    <span>Login</span>
                    <input onChange={e => setLoginInput(e.target.value)} type="text" /> 
                    <br />

                    <span>Name</span>
                    <input onChange={e => setNameInput(e.target.value)} type="text" /> 
                    <br />

                    <span>Surname</span>
                    <input onChange={e => setSurnameInput(e.target.value)} type="text" /> 
                    <br />
 
                    <span>Password</span>
                    <input onChange={e => setPasswordInput(e.target.value)} type="password" />
                    <br />

                    <span>Repeat password</span>
                    <input onChange={e => setRepeatPasswordInput(e.target.value)} type="password" /> <br />
                </div>

                <section className={classes.policy}><input onClick={(e: any) => setAgreePolicyInput(e.target.checked)} type="checkbox" />
                <span>I agree the policy . . .</span></section> <br />
                <div onClick={registerHandler} className={classes.registerBtn}>Register</div>
                <span className={classes.Msg}>Have you already registered? - <NavLink to="/login">Login</NavLink></span>
            </div>
        </div>
    );
}

export default RegisterPage;
