import React, {FC, PropsWithChildren, RefObject, useRef} from 'react';
import {NavLink} from 'react-router-dom';
// @ts-ignore
import classes from "./Menu.module.scss"
import {authThunks} from '../../../store/Thunks';
import {useAppDispatch} from '../../../utils/hooks';

interface IProps {
    to?: string
}

const MyNavLink: FC<PropsWithChildren<IProps>> = ({children, to}) => {
    const dispatch = useAppDispatch();
    const endLine: RefObject<any> = useRef();

    function handleEnter() {
        if (to) {
            endLine.current.classList.add(classes.hoveredLink)
        } else {
            endLine.current.classList.add(classes.hoveredLogout)
        }
    }

    function handleOut() {
        if (to) {
            endLine.current.classList.remove(classes.hoveredLink)
        } else {
            endLine.current.classList.remove(classes.hoveredLogout)
        }
    }

    return (
        <>
            {to
                ? <div className={classes.menuLink}>
                    <NavLink onMouseEnter={handleEnter} onMouseOut={handleOut} to={to}>{children}</NavLink>
                    <div ref={endLine}></div>
                </div>

                : <div className={classes.menuLink}>
                    <span onMouseEnter={handleEnter} onMouseOut={handleOut} className={classes.a}
                          onClick={e => dispatch(authThunks.logout())}>{children}</span>
                    <div ref={endLine}></div>
                </div>}
        </>
    );
}

export default MyNavLink;
