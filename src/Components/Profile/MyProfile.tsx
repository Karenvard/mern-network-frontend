import React, {useState} from 'react';
import {Button, Input, Tooltip} from "antd";
// @ts-ignore
import HeaderIcon from "../../assets/header.webp"
// @ts-ignore
import classes from "./Profile.module.css"
// @ts-ignore
import UserIcon from "../../assets/userIcon.png"
import {authThunks} from "../../store/Thunks";
import {InfoCircleOutlined} from "@ant-design/icons";
import {IError} from "../../models/IError";
import {IProfile} from "../../models/IProfile";
import {useAppDispatch} from "../../hooks/hooks";

interface IProps {
    router: any
    error: IError
    authProfile: IProfile
}

const MyProfile = (props: IProps) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState<File>();
    const [isActive, setIsActive] = useState<boolean>(false);
    const [editMode, setEditMode] = useState(false)
    function setPhoto() {
        if (image) {
            dispatch(authThunks.setAuthPhoto(image))
        }
    }

    return <div className={classes.container}>
        <img src={props.authProfile.photos.large || HeaderIcon} className={classes.headerIMG} alt=""/>
        <div className={classes.profileInfo}>
            {props.error.body || null}
            <div>
                <img src={props.authProfile.photos.small || UserIcon} className={classes.profilePhoto} alt=""/> <br/>
                <br/>
                <div><input onChange={(e) => { // @ts-ignore
                    setImage(e.target.files[0]);
                    setIsActive(true)
                }} type={"file"} className={classes.upload}/> <br/> <br/></div>
                {isActive ? <Button className={classes.uploadBtn} onClick={() => {
                    setPhoto();
                    setIsActive(false)
                }} type={"primary"}>Upload</Button> : null}
            </div>
            <div>
                <h1 className={classes.about}>{props.authProfile.name}</h1>
                {editMode ? <Input
                    className={classes.about}
                    onBlur={e => {
                        setEditMode(false);
                        dispatch(authThunks.setAuthStatus(e.target.value))
                    }}
                    autoFocus={true}
                    placeholder={props.authProfile.status || "Status"}
                    suffix={
                        <Tooltip title="Enter your new status">
                            <InfoCircleOutlined style={{color: 'rgba(0,0,0,.45)'}}/>
                        </Tooltip>}/> : <h3 className={classes.about}
                                            onDoubleClick={() => setEditMode(true)}>{props.authProfile.status || "------"}</h3>} <br/>
                <p>{props.authProfile.aboutMe}</p>
            </div>
        </div>
    </div>
};

export default MyProfile;