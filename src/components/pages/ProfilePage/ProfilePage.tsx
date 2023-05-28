import React, { FC, useEffect, useState, useRef, RefObject } from 'react';
// @ts-ignore
import classes from "./ProfilePage.module.scss"
// @ts-ignore
import headerPhoto from "../../../assets/photos/headerPhoto.webp"
// @ts-ignore
import userPhoto from "./../../../assets/photos/userPhoto.png";
// @ts-ignore
import heartOutlineICON from "./../../../assets/icons/outlineHeartIcon.png"
// @ts-ignore
import cameraIcon from "../../../assets/icons/cameraIcon.png"
// @ts-ignore
import commentICON from "./../../../assets/icons/commentIcon.png"
// @ts-ignore
import notUploadedPhoto from "../../../assets/photos/notUploadedImage.png"
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { authThunks } from '../../../store/Thunks';
import Popup from '../../common/Popup/Popup';


const ProfilePage: FC = () => {
    const dispatch = useAppDispatch();
    const containerRef: RefObject<any> = useRef();
    const {profile, photoPreview} = useAppSelector(state => state.authReducer);
    const [newStatus, setNewStatus] = useState<string>('');
    const [isEditStatus, setIsEditStatus] = useState<boolean>(false);
    const [isEditAboutMe, setIsEditAboutMe] = useState<boolean>(false);
    const [newAboutMe, setNewAboutMe] = useState<string>('');
    const [headerPopup, setHeaderPopup] = useState<boolean>(false);
    const [photoPopup, setPhotoPopup] = useState<boolean>(false);
    const [newHeaderPhoto, setNewHeaderPhoto] = useState<File | null>(null);
    const [newPhoto, setNewPhoto] = useState<File | null>(null);
    function onHeaderSet(e: any) {
        setNewHeaderPhoto(e.target.files[0]);
        if (e.target.files[0]) dispatch(authThunks.getPhotoPreview(e.target.files[0]));
    }

    function onPhotoSet(e: any) {
        setNewPhoto(e.target.files[0]);
        if (e.target.files[0]) dispatch(authThunks.getPhotoPreview(e.target.files[0]));
    }

    function uploadHeaderHandle() {
        if (newHeaderPhoto) {
            dispatch(authThunks.setAuthHeader(newHeaderPhoto));
            setHeaderPopup(false);
            dispatch(authThunks.clearPhotoPreview());
            document.body.style.overflowY = "auto";
        }
    }

    function uploadPhotoHandle() {
        if (newPhoto) {
            dispatch(authThunks.setAuthPhoto(newPhoto));
            setPhotoPopup(false);
            dispatch(authThunks.clearPhotoPreview());
            document.body.style.overflowY = "auto";
        }
    }

    useEffect(() => {
        window.addEventListener("load", function() {
            dispatch(authThunks.clearPhotoPreview());
        })
        containerRef.current.style.height = `${containerRef.current.clientHeight + 50}px`
        dispatch(authThunks.getAuthProfile())
        if (profile.status) {
            setNewStatus(profile.status);
        }
        return function cleanup() {
            dispatch(authThunks.clearPhotoPreview());
        }
    }, [])
    return <>
        <Popup DispatchOnClose={authThunks.clearPhotoPreview} setIsActive={setHeaderPopup} isActive={headerPopup}>
            <div className={classes.HeaderPopupContainer}>
                <span>Photo preview</span>
                <img className={classes.previewHeader} src={photoPreview || notUploadedPhoto} alt="" />
                <label htmlFor="file-upload" className={classes.custom_file_upload}>
                    Upload File
                </label>
                <input onChange={onHeaderSet} id="file-upload" type="file"/>

                <button onClick={uploadHeaderHandle} className={classes.uploadHeaderBTN}>Upload</button>
            </div>
        </Popup>

        <Popup DispatchOnClose={authThunks.clearPhotoPreview} setIsActive={setPhotoPopup} isActive={photoPopup}>
            <div className={classes.HeaderPopupContainer}>
                <span>Photo preview</span>
                <img className={classes.previewPhoto} src={photoPreview || userPhoto} alt="" />
                <label htmlFor="file-upload" className={classes.custom_file_upload}>
                    Upload File
                </label>
                <input onChange={onPhotoSet} id="file-upload" type="file"/>

                <button onClick={uploadPhotoHandle} className={classes.uploadHeaderBTN}>Upload</button>
            </div>
        </Popup>



        <div ref={containerRef} className={classes.container}>
            <div className={classes.header}>
                {profile.header 
                ? <img className={classes.headerIMG} src={profile.header} alt="" /> 
                : <div className={classes.headerIMG} style={{background: "var(--my-green)"}}></div>}
                <button onClick={e => setHeaderPopup(true)} ><img src={cameraIcon} alt="" /> Change your header photo</button>
            </div>

            <div className={classes.info}>
                <img onClick={e => setPhotoPopup(true)} src={profile.avatar || userPhoto} alt="" />
                <div>
                    <span>{profile.name}</span> <br />
                    {isEditStatus 
                    ? <input value={newStatus}
                            className={classes.statusInput}
                            maxLength={11}
                            autoFocus
                            onBlur={e => {setIsEditStatus(false); dispatch(authThunks.setAuthStatus(newStatus))}}
                            onChange={e => setNewStatus(e.target.value)} 
                            type="text" />
                            
                    : <span onDoubleClick={e => setIsEditStatus(true)}>{profile.status || "-------------"}</span>
                    }
                </div>
                {isEditAboutMe  
                ?   <><textarea onChange={(e: any) => setNewAboutMe(e.target.value)}
                                maxLength={400} 
                                onBlur={e => {setIsEditAboutMe(false); dispatch(authThunks.setAuthAboutMe(newAboutMe))}} 
                                className={classes.profileAboutMe}/> 
                                <span>{400 - newAboutMe.length}</span></>
                
                :   <p onDoubleClick={e => setIsEditAboutMe(true)} className={classes.profileAboutMe}> 
                        {profile.aboutMe || "--------------------"}
                    </p>
                }
            </div>

            <div className={classes.posts}>
                <span className={classes.lastPostTitle}>Last post</span>
                <div className={classes.lastPost}>
                    <img src={headerPhoto} alt="" />
                    <p className={classes.lastPostDescription}></p>
                    <div className={classes.tools}>
                        <img src={heartOutlineICON} alt="" />
                        <img src={commentICON} alt="" />
                    </div>
                </div>


            </div>
        </div>
    </>
}

export default ProfilePage;
