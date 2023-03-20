import React, {useLayoutEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import User from "./User";
// @ts-ignore
import classes from "./Users.module.css"
import {usersThunks} from "../../store/Thunks";

const Users = () => {
    const dispatch = useAppDispatch();
    const {users} = useAppSelector(state => state.usersReducer)
    const {userId} = useAppSelector(state => state.authReducer.profile)
    useLayoutEffect(() => {
        dispatch(usersThunks.getUsers({page: 1, pageSize: 30}));
    }, [])
    const UsersElements = users.map(u => {
        if (u.userId !== userId) {
            return <User
                name={u.name}
                userId={u.userId}
                photos={u.photos}
                status={u.status}
                followed={u.followed}
                _id={u._id}
                aboutMe={u.aboutMe}
                login={u.login}
                posts={u.posts}
                vorname={u.vorname}/>
        }
    })


    return <div className={classes.container}>
        {UsersElements}
    </div>
};

export default Users;