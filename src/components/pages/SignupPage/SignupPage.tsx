import React, { FC, useState } from 'react';
// @ts-ignore
import classes from "./SignupPage.module.scss"
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../../utils/hooks';
import {authThunks} from '../../../store/Thunks';

const SignupPage: FC = () => {
    const dispatch = useAppDispatch();
    const [usernameInput, setUsernameInput] = useState<string>('');
    const [nameInput, setNameInput] = useState<string>('');
    const [surnameInput, setSurnameInput] = useState<string>('');
    const [passwordInput, setPasswordInput] = useState<string>('');
    const [repeatPasswordInput, setRepeatPasswordInput] = useState<string>('');
    const [agreePolicyInput, setAgreePolicyInput] = useState<boolean>(false);

    function SignupHandler() {
        if (passwordInput === repeatPasswordInput && agreePolicyInput === true) {
            dispatch(authThunks.signup({username: usernameInput, password: passwordInput, name: nameInput, surname: surnameInput}));
        }
    }
    return (
        <div className={classes.container}>
            <div className={classes.form}>
                <div>
                    <span>Username</span>
                    <input onChange={e => setUsernameInput(e.target.value)} type="text" /> 
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
                <div onClick={SignupHandler} className={classes.registerBtn}>Sign up</div>
                <span className={classes.Msg}>Have you already signed up? - <NavLink to="/signin">Sign in</NavLink></span>
            </div>
        </div>
    );
}

export default SignupPage;
