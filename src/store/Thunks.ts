import {createAsyncThunk} from "@reduxjs/toolkit";
import authAPI from "../utils/api/authAPI";
import usersAPI from "../utils/api/usersAPI";
import {ISignForm} from "../utils/models/ISignForm";
import {IProfile} from "../utils/models/IProfile";
import { RootState } from "./Store";

class authThunksClass {
    register = createAsyncThunk('register', async ({login, password, name, surname}: ISignForm, thunkAPI) => {
        try {
            const {data} = await authAPI.register(login, password, name, surname);

            if (data.resultCode === 0) {
                return data.message
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    login = createAsyncThunk('login', async ({login, password, rememberMe}: ISignForm, thunkAPI) => {
        try {
            const {data} = await authAPI.login(login, password, rememberMe);
            if (data.resultCode === 0) {
                localStorage.setItem("jwt-token", data.token)
                 return thunkAPI.dispatch(this.getAuthProfile())
            }
            if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    logout = createAsyncThunk('logout', async (_, thunkAPI) => {
        try {
            return localStorage.setItem("jwt-token", "")
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    getAuthProfile = createAsyncThunk('get/auth/profile', async (_, thunkAPI) => {
        try {
            const {data} = await authAPI.getAuthProfile();
            if (data.resultCode === 0) {
                thunkAPI.dispatch(this.setAuthProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    setAuthPhoto = createAsyncThunk('set/auth/photo', async (photo: File, thunkAPI) => {
        try {
            const {data} = await authAPI.setAuthPhoto(photo);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(this.setAuthProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    setAuthHeader = createAsyncThunk('set/auth/header', async (photo: File, thunkAPI) => {
        try {
            const {data} = await authAPI.setAuthHeader(photo);
            if (data.resultCode === 0) {
                return thunkAPI.dispatch(this.setAuthProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    setAuthAboutMe = createAsyncThunk('set/auth/about/me', async (value: string, thunkAPI) => {
        try {
            const {data} = await authAPI.setAuthAboutMe(value);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(this.setAuthProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    setAuthStatus = createAsyncThunk('set/auth/status', async (value: string, thunkAPI) => {
        try {
            const {data} = await authAPI.setAuthStatus(value);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(this.setAuthProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    addAuthPost = createAsyncThunk('add/auth/post', async ({Title, Description, photo}: { Title: string, Description: string, photo: File }, thunkAPI) => {
        try {
            const {data} = await authAPI.addPost(Title, Description, photo);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(this.setAuthProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    addComment = createAsyncThunk('add/comment', async ({Title, Body, PostId}: { Title: string, Body: string, PostId: number }, thunkAPI) => {
        try {
            const {data} = await authAPI.addComment(Title, Body, PostId);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(this.getAuthProfile())
                thunkAPI.dispatch(usersThunks.setUserProfile(data.profile))
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    likePost = createAsyncThunk('like/post', async ({userId, postId}: {userId: string, postId: string}, thunkAPI) => {
        try {
            const {data} = await authAPI.likePost(userId, postId);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(data.profile)
                thunkAPI.dispatch(this.getAuthProfile())
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    likeComment = createAsyncThunk('like/comment', async ({postId, CommentId}: { postId: number, CommentId: number }, thunkAPI) => {
        try {
            const {data} = await authAPI.likeComment(postId, CommentId);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(data.profile)
                thunkAPI.dispatch(this.getAuthProfile())
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    disLikePost = createAsyncThunk('dis/like/post', async (PostId: number, thunkAPI) => {
        try {
            const {data} = await authAPI.disLikePost(PostId);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(data.profile)
                thunkAPI.dispatch(this.getAuthProfile())
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    disLikeComment = createAsyncThunk('dis/like/comment', async ({postId, CommentId}: { postId: number, CommentId: number }, thunkAPI) => {
        try {
            const {data} = await authAPI.disLikeComment(postId, CommentId);
            if (data.resultCode === 0) {
                thunkAPI.dispatch(data.profile)
                thunkAPI.dispatch(this.getAuthProfile())
            } else if (data.resultCode === 1) {
                return thunkAPI.rejectWithValue(data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    setAuthProfile = createAsyncThunk('set/auth/profile', async (profile: IProfile, thunkAPI) => {
        try {
            return profile;
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    getPhotoPreview = createAsyncThunk('get/photoPreview', async (photo: File, thunkAPI) => {
        try {
            const {data} = await authAPI.getPhotoPreview(photo);
            if (data.resultCode === 0) {
                return thunkAPI.fulfillWithValue(data.photo);
            } else {
                return thunkAPI.rejectWithValue(data.error);
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    clearPhotoPreview = createAsyncThunk('clear/photoPreview', async (_, thunkAPI) => {
        try {
            const {authReducer} = thunkAPI.getState() as RootState;
            const targetPhotoPreview = authReducer.photoPreview.split("/")[authReducer.photoPreview.split("/").length - 1] 
            const response = await authAPI.deletePhotoPreview(targetPhotoPreview);
            console.log(response)
            if (response.status = 200) {
                return;
            } else {
                return thunkAPI.rejectWithValue(response.data.error)
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })
}

class usersThunksClass {
    getUsers = createAsyncThunk('get/users', async ({page, pageSize}: { page: number, pageSize: number }, thunkAPI) => {
            try {
                const {data} = await usersAPI.getUsers(page, pageSize)
                if (data.resultCode === 0) {
                    return {
                        users: data.users,
                        totalCount: data.totalCount
                    }
                } else if (data.resultCode === 1) {
                    return thunkAPI.rejectWithValue(data.error)
                }
            } catch (e: any) {
                if (e.message === "Network Error") {
                    return thunkAPI.rejectWithValue({
                        type: "network-error",
                        body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                    })
                } else {
                    console.log(e)
                }
            }
        })

    getUserById = createAsyncThunk('get/user/by/id', async (id: string, thunkAPI) => {
            try {
                const {data} = await usersAPI.getUserById(id)
                if (data.resultCode === 0) {
                    thunkAPI.dispatch(this.setUserProfile(data.profile))
                } else if (data.resultCode === 1) {
                    return thunkAPI.rejectWithValue(data.error)
                }
            } catch (e: any) {
                if (e.message === "Network Error") {
                    return thunkAPI.rejectWithValue({
                        type: "network-error",
                        body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                    })
                } else {
                    console.log(e)
                }
            }
        })

    followUser = createAsyncThunk('follow/user', async (id: string, thunkAPI) => {
            try {
                const {data} = await usersAPI.followUser(id)
                if (data.resultCode === 0) {
                    return id;
                } else if (data.resultCode === 1) {
                    return thunkAPI.rejectWithValue(data.error)
                }
            } catch (e: any) {
                if (e.message === "Network Error") {
                    return thunkAPI.rejectWithValue({
                        type: "network-error",
                        body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                    })
                } else {
                    console.log(e)
                }
            }
        })

    unFollowUser = createAsyncThunk('unfollow/user', async (id: string, thunkAPI) => {
            try {
                const {data} = await usersAPI.unFollowUser(id)
                if (data.resultCode === 0) {
                    return id;
                } else if (data.resultCode === 1) {
                    return thunkAPI.rejectWithValue(data.error)
                }
            } catch (e: any) {
                if (e.message === "Network Error") {
                    return thunkAPI.rejectWithValue({
                        type: "network-error",
                        body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                    })
                } else {
                    console.log(e)
                }
            }
        })

    setUserProfile = createAsyncThunk('set/user/profile', async (profile: IProfile, thunkAPI) => {
        try {
            return thunkAPI.fulfillWithValue(profile)
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })

    getChats = createAsyncThunk('get/chats', async (_, thunkAPI) => {
        try {
            const {data} = await usersAPI.getChats();
            return {
                chats: data.chats,
                convPartners: data.convPartners
            }
        } catch (e: any) {
            if (e.message === "Network Error") {
                return thunkAPI.rejectWithValue({
                    type: "network-error",
                    body: "Проблемы с соеденением, попробуйте пожалуйста позже"
                })
            } else {
                console.log(e)
            }
        }
    })
}

export const usersThunks = new usersThunksClass();
export const authThunks = new authThunksClass();
