import { FC, RefObject, useEffect, useRef, useState } from 'react';
// @ts-ignore
import classes from "./ProfilePage.module.scss";
// @ts-ignore
import headerPhoto from "../../../assets/photos/headerPhoto.webp";
// @ts-ignore
import userPhoto from "./../../../assets/photos/userPhoto.png";
// @ts-ignore
import heartOutlineICON from "./../../../assets/icons/outlineHeartIcon.png";
// @ts-ignore
import cameraIcon from "../../../assets/icons/cameraIcon.png";
// @ts-ignore
import commentICON from "./../../../assets/icons/commentIcon.png";
// @ts-ignore
import notUploadedPhoto from "../../../assets/photos/notUploadedImage.png";
import { authThunks } from '../../../store/Thunks';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import Popup from '../../common/Popup/Popup';


const ProfilePage: FC = () => {
    const dispatch = useAppDispatch();
    const containerRef: RefObject<any> = useRef();
    const headerPreviewRef = useRef<HTMLImageElement>(null);
    const avatarPreviewRef = useRef<HTMLImageElement>(null);
    const {profile} = useAppSelector(state => state.authReducer);
    const [newStatus, setNewStatus] = useState<string>('');
    const [isEditStatus, setIsEditStatus] = useState<boolean>(false);
    const [isEditAboutMe, setIsEditAboutMe] = useState<boolean>(false);
    const [newAboutMe, setNewAboutMe] = useState<string>('');
    const [headerPopup, setHeaderPopup] = useState<boolean>(false);
    const [deleteHeaderPopup, setDeleteHeaderPopup] = useState<boolean>(false);
    const [avatarPopup, setAvatarPopup] = useState<boolean>(false);
    const [newHeader, setNewHeader] = useState<File | null>(null);
    const [newAvatar, setNewAvatar] = useState<File | null>(null);

    function onHeaderSet(e: any) {
        setNewHeader(e.target.files[0]);
        if (headerPreviewRef.current) headerPreviewRef.current.src = URL.createObjectURL(e.target.files[0]);
    }

    function onAvatarSet(e: any) {
        setNewAvatar(e.target.files[0]);
        if (avatarPreviewRef.current) avatarPreviewRef.current.src = URL.createObjectURL(e.target.files[0]);
        console.log(URL.createObjectURL(e.target.files[0]));
    }

    function uploadHeaderHandle() {
      if (newHeader) {
        dispatch(authThunks.setAuthHeader(newHeader));
        setHeaderPopup(false);
      }
    }

    function uploadAvatarHandle() {
      if (newAvatar) {
        dispatch(authThunks.setAuthPhoto(newAvatar));
        setAvatarPopup(false);
      }
    }
    
    function deleteHeaderHandle() {
        dispatch(authThunks.deleteHeader());
        setDeleteHeaderPopup(false);
    }

    useEffect(() => {
        containerRef.current.style.height = `${containerRef.current.clientHeight + 50}px`
        dispatch(authThunks.getAuthProfile())
        if (profile.status) {
            setNewStatus(profile.status);
        }
    }, [])
    return <>
        <Popup setIsActive={setHeaderPopup} isActive={headerPopup}>
            <Popup setIsActive={setDeleteHeaderPopup} isActive={deleteHeaderPopup}>
              <div className={classes.confirmDeleteHeader}>
                <span>Are you sure?</span>
                <div>
                  <button onClick={deleteHeaderHandle}>Yes</button>
                  <button onClick={_ => setDeleteHeaderPopup(false)}>No</button>
                </div>
              </div>
            </Popup>
            <div className={classes.HeaderPopupContainer}>
                <span>Photo preview</span>
                <img className={classes.previewHeader} ref={headerPreviewRef} src={notUploadedPhoto} alt="" />
                <label htmlFor="file-upload" className={classes.custom_file_upload}>
                    Upload File
                </label>
                <input onChange={onHeaderSet} id="file-upload" type="file"/>
                <button onClick={_ => setDeleteHeaderPopup(true)}>Delete header</button>
                <button onClick={uploadHeaderHandle} className={classes.uploadHeaderBTN}>Upload</button>
            </div>
        </Popup>

        <Popup setIsActive={setAvatarPopup} isActive={avatarPopup}>
            <div className={classes.HeaderPopupContainer}>
                <span>Photo preview</span>
                <img className={classes.previewPhoto} ref={avatarPreviewRef} src={userPhoto} alt="" />
                <label htmlFor="file-upload" className={classes.custom_file_upload}>
                    Upload File
                </label>
                <input onChange={onAvatarSet} id="file-upload" type="file"/>

                <button onClick={uploadAvatarHandle} className={classes.uploadHeaderBTN}>Upload</button>
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
                <img onClick={e => setAvatarPopup(true)} src={profile.avatar || userPhoto} alt="" />
                <div>
                    <span>{profile.name}</span> <br />
                    {isEditStatus 
                    ? <input value={newStatus}
                            className={classes.statusInput}
                            maxLength={11}
                            autoFocus
                            onBlur={_ => {setIsEditStatus(false); dispatch(authThunks.setAuthStatus(newStatus))}}
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
