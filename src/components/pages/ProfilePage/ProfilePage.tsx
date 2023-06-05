import { FC, RefObject, useEffect, useRef, useState } from 'react';
// @ts-ignore
import classes from "./ProfilePage.module.scss";
// @ts-ignore
import userPhoto from "./../../../assets/photos/userPhoto.png";
// @ts-ignore
import cameraIcon from "../../../assets/icons/cameraIcon.png";
// @ts-ignore
import notUploadedPhoto from "../../../assets/photos/notUploadedImage.png";
import { authThunks } from '../../../store/Thunks';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import Popup from '../../common/Popup/Popup';
import Posts from './Posts';


const ProfilePage: FC = () => {
  const dispatch = useAppDispatch();
  const containerRef: RefObject<any> = useRef();
  const headerPreviewRef = useRef<HTMLImageElement>(null);
  const avatarPreviewRef = useRef<HTMLImageElement>(null);
  const { profile } = useAppSelector(state => state.authReducer);
  const [newStatus, setNewStatus] = useState<string>('');
  const [isEditStatus, setIsEditStatus] = useState<boolean>(false);
  const [isEditAboutMe, setIsEditAboutMe] = useState<boolean>(false);
  const [newAboutMe, setNewAboutMe] = useState<string>('');
  const [newPostInfo, setNewPostInfo] = useState<{ photo?: File, title: string, body: string }>({ title: "", body: "" });
  const [headerPopup, setHeaderPopup] = useState<boolean>(false);
  const [deleteHeaderPopup, setDeleteHeaderPopup] = useState<boolean>(false);
  const [newHeaderPopup, setNewHeaderPopup] = useState<boolean>(false);
  const [deleteAvatarPopup, setDeleteAvatarPopup] = useState<boolean>(false);
  const [newAvatarPopup, setNewAvatarPopup] = useState<boolean>(false);
  const [avatarPopup, setAvatarPopup] = useState<boolean>(false);
  const [newPostPopup, setNewPostPopup] = useState<boolean>(false);
  const [newHeader, setNewHeader] = useState<File | null>(null);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  function onHeaderSet(e: any) {
    setNewHeader(e.target.files[0]);
    if (headerPreviewRef.current) headerPreviewRef.current.src =
      URL.createObjectURL(e.target.files[0]);
  }

  function onAvatarSet(e: any) {
    setNewAvatar(e.target.files[0]);
    if (avatarPreviewRef.current) avatarPreviewRef.current.src =
      URL.createObjectURL(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
  }

  function uploadHeaderHandle() {
    if (newHeader) {
      dispatch(authThunks.setAuthHeader(newHeader));
      setNewHeaderPopup(false);
    }
  }

  function uploadAvatarHandle() {
    if (newAvatar) {
      dispatch(authThunks.setAuthPhoto(newAvatar));
      setNewAvatarPopup(false);
    }
  }

  function clearHeaderHandle() {
    dispatch(authThunks.clearHeader());
    setDeleteHeaderPopup(false);
  }

  function clearAvatarHandle() {
    dispatch(authThunks.clearAvatar());
    setDeleteAvatarPopup(false);
  }


  useEffect(() => {
    containerRef.current.style.height = `${containerRef.current.clientHeight + 50}px`
    dispatch(authThunks.getAuthProfile())
    if (profile.status) {
      setNewStatus(profile.status);
    }
  }, [])
  return <>

    <Popup isActive={newPostPopup} setIsActive={setNewPostPopup}>
      <div className={classes.newPostForm}>
        <div>
          Title
          <input type="text" onChange={e => setNewPostInfo(prev => ({ ...prev, title: e.target.value }))} />
        </div>
        <div>
          Description
          <input type="text" onChange={e => setNewPostInfo(prev => ({ ...prev, body: e.target.value }))} />
        </div>
        <div>
          Photo preview
          <img src={newPostInfo.photo ? URL.createObjectURL(newPostInfo.photo) : notUploadedPhoto} alt=""/>
          {/*@ts-ignore*/}
          <input id="input-post-photo" style={{display: "none"}} type="file" onChange={e => setNewPostInfo(prev => ({ ...prev, photo: e.target.files[0] }))} />
          <label htmlFor="input-post-photo">
            Upload
          </label>
        </div>
        <button>Create</button>
      </div>
    </Popup>

    <Popup setIsActive={setHeaderPopup} isActive={headerPopup}>
      <div className={classes.avatarandHeaderPopupContainer}>
        <button onClick={_ => setNewHeaderPopup(true)}>Upload new</button>
        <button onClick={_ => setDeleteHeaderPopup(true)}>Delete</button>
      </div>
    </Popup>

    <Popup setIsActive={setDeleteHeaderPopup} isActive={deleteHeaderPopup}>
      <div className={classes.confirmDeletePhoto}>
        <span>Are you sure?</span>
        <div>
          <button onClick={clearHeaderHandle}>Yes</button>
          <button onClick={_ => setDeleteHeaderPopup(false)}>No</button>
        </div>
      </div>
    </Popup>

    <Popup isActive={newHeaderPopup} setIsActive={setNewHeaderPopup}>
      <div className={classes.newHeaderPopupContainer}>
        <span>Photo preview</span>
        <img className={classes.previewHeader} ref={headerPreviewRef} src={notUploadedPhoto}
          alt="" />
        <label htmlFor="file-upload" className={classes.custom_file_upload}>
          Upload File
        </label>
        <input onChange={onHeaderSet} id="file-upload" type="file" />
        <button onClick={uploadHeaderHandle}
          className={classes.uploadHeaderBTN}>Upload</button>
      </div>
    </Popup>

    <Popup isActive={avatarPopup} setIsActive={setAvatarPopup}>
      <div className={classes.avatarandHeaderPopupContainer}>
        <button onClick={_ => setNewAvatarPopup(true)}>Upload new</button>
        <button onClick={_ => setDeleteAvatarPopup(true)}>Delete</button>
      </div>
    </Popup>

    <Popup setIsActive={setNewAvatarPopup} isActive={newAvatarPopup}>
      <div className={classes.newHeaderPopupContainer}>
        <span>Photo preview</span>
        <img className={classes.previewPhoto} ref={avatarPreviewRef} src={userPhoto}
          alt="" />
        <label htmlFor="file-upload" className={classes.custom_file_upload}>
          Upload File
        </label>
        <input onChange={onAvatarSet} id="file-upload" type="file" />

        <button onClick={uploadAvatarHandle}
          className={classes.uploadHeaderBTN}>Upload</button>
      </div>
    </Popup>

    <Popup setIsActive={setDeleteAvatarPopup} isActive={deleteAvatarPopup}>
      <div className={classes.confirmDeletePhoto}>
        <span>Are you sure?</span>
        <div>
          <button onClick={clearAvatarHandle}>Yes</button>
          <button onClick={_ => setDeleteAvatarPopup(false)}>No</button>
        </div>
      </div>
    </Popup>



    <div ref={containerRef} className={classes.container}>
      <div className={classes.header}>
        {profile.header
          ? <img className={classes.headerIMG} src={profile.header} alt="" />
          : <div className={classes.headerIMG} style={{ background: "var(--my-green)" }}>
          </div>}
        <button onClick={_ => profile.header ? setHeaderPopup(true) :
          setNewHeaderPopup(true)} ><img src={cameraIcon} alt="" /> Change
          your
          header photo</button>
      </div>

      <div className={classes.info}>
        <img onClick={_ => profile.avatar ? setAvatarPopup(true) : setNewAvatarPopup(true)}
          src={profile.avatar || userPhoto} alt="" />
        <div className={classes.nameStatus}>
          <span>{profile.name}</span> <br />
          {isEditStatus
            ? <input value={newStatus} className={classes.statusInput} maxLength={11}
              autoFocus onBlur={_ => {
                setIsEditStatus(false);
                dispatch(authThunks.setAuthStatus(newStatus))
              }}
              onChange={e => setNewStatus(e.target.value)}
              type="text" />

            : <span onDoubleClick={e => setIsEditStatus(true)}>{profile.status ||
              "-------------"}</span>
          }
        </div>
        {isEditAboutMe
          ? <><textarea onChange={(e: any) => setNewAboutMe(e.target.value)}
            maxLength={400}
            onBlur={_ => {
              setIsEditAboutMe(false);
              dispatch(authThunks.setAuthAboutMe(newAboutMe))
            }}
            className={classes.profileAboutMe} /> <br />
            <span>{400 - newAboutMe.length}</span></>

          : <p onDoubleClick={e => setIsEditAboutMe(true)} className={classes.profileAboutMe}>
            {profile.aboutMe || "--------------------"}
          </p>
        }
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button onClick={_ => setNewPostPopup(true)} style={{ backgroundColor: "var(--my-red)", border: "none", color: "white", width: "16vw", height: "7vh", fontSize: "2em", fontWeight: "600" }}>
          Create new post
        </button>
      </div>

      {profile.posts && profile.posts.length ? <Posts /> : null}
    </div>
  </>
}

export default ProfilePage;
