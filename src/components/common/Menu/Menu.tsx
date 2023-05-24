import React, { FC, RefObject, useEffect, useRef } from 'react';
// @ts-ignore
import classes from "./Menu.module.scss"
import MyNavLink from './MyNavLink';
import { useAppSelector } from '../../../utils/hooks';

interface IProps {
    callbackFn: Function
}

const Menu: FC<IProps> = (props) => {
    const menu: RefObject<any> = useRef();
    const {isAuth} = useAppSelector(state => state.authReducer);
    useEffect(() => {
        props.callbackFn(menu);
    }, [])
    return (
        <div ref={menu} className={classes.container}>
            {isAuth 
            ? <>
            <MyNavLink to='/'>Home</MyNavLink>
            <MyNavLink to='/profile'>Profile</MyNavLink>
            <MyNavLink to='/friends'>Friends</MyNavLink>
            <MyNavLink to='/dialogs'>Dialogs</MyNavLink>
            <MyNavLink to='/users'>Users</MyNavLink>
            <MyNavLink>Logout</MyNavLink>
             </> 
             
             : <>
                <MyNavLink to='/register'>Register</MyNavLink>
                <MyNavLink to='/login'>Login</MyNavLink>
                <div style={{display: "none"}}></div>
              </>}
        </div>
    );
}

export default Menu;