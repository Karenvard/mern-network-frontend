import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector, useWithAuth} from "../../hooks/hooks";
import {useParams} from "react-router-dom";
import MyProfile from "./MyProfile";
import UserProfile from "./UserProfile";
import {authThunks, usersThunks} from "../../store/Thunks";

const Profile = () => {
    const dispatch = useAppDispatch();
    const router = useParams()
    const {isAuth, profile, error} = useAppSelector(state => state.authReducer)
    const {currentUser} = useAppSelector(state => state.usersReducer)
    useWithAuth(isAuth, localStorage.getItem("jwt-token"))
    useEffect(() => {
        dispatch(authThunks.getAuthProfile())
    }, [])


    if (!router.id || router.id === profile.userId) {
        return <MyProfile router={router} authProfile={profile}  error={error}/>
    } else if (router.id && router.id !== profile.userId) {
        dispatch(usersThunks.getUserById(router.id))
        return <UserProfile error={error} currentUser={currentUser}/>
    }
};

export default Profile;