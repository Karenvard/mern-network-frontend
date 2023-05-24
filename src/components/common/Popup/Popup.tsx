import React, { FC, PropsWithChildren} from 'react';
// @ts-ignore
import classes from "./Popup.module.scss"
import { useAppDispatch } from '../../../utils/hooks';

interface IProps {
    isActive: boolean
    setIsActive: (value: boolean) => void
    DispatchOnClose?: Function
    onClose?: Function
}


const Popup: FC<PropsWithChildren<IProps>> = ({children, isActive, setIsActive, ...props}) => {
    const dispatch = useAppDispatch();
    if (!isActive) return null;
    document.body.style.overflowY = "hidden";

    function onClose() {
        setIsActive(false);
        document.body.style.overflowY = "auto";
        if (props.DispatchOnClose) dispatch(props.DispatchOnClose());
        if (props.onClose) props.onClose();
    }
    return (
        <div className={classes.wrap}>
            <div className={classes.container}>
                <div onClick={onClose} className={classes.cross}>
                    <div></div>
                    <div></div>
                </div>
                {children}
            </div>
        </div> 
    );
}

export default Popup;