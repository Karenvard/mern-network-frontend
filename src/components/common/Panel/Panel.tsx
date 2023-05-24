import React, {FC, RefObject, useRef, useState} from 'react';
// @ts-ignore
import classes from "./Panel.module.scss"
import { NavLink } from 'react-router-dom';
import Menu from "../Menu/Menu";


const Panel: FC = () => {
    const [menuDiv, setMenuDiv] = useState<RefObject<HTMLDivElement>>();
    const menu__trigger: RefObject<any> = useRef();
    function handleTrigger(e: any) {
        menuDiv?.current?.classList.toggle(classes.activeMenu);
        menu__trigger.current.classList.toggle(classes.triggered);
    }
    return (
        <div className={classes.container}>
            <NavLink to="/"><span>SCN</span></NavLink>
            <Menu callbackFn={setMenuDiv}/>
            <div ref={menu__trigger} className={classes.menu__trigger} onClick={handleTrigger}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Panel;
