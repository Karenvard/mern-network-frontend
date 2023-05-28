import {createAsyncThunk} from "@reduxjs/toolkit";
import authAPI from "../utils/api/authAPI";
import usersAPI from "../utils/api/usersAPI";
import {ISignForm} from "../utils/models/ISignForm";
import {IProfile} from "../utils/models/IProfile";
import { RootState } from "./Store";

interface IThunkAPI {
  rejectWithValue: (value: any) => void,
  fulfillWithValue: (value: any) => void,
  dispatch: (action: any) => void
}


function checkAndSendError(e: any, thunkAPI: IThunkAPI) {
  if (e.message === "Network Error") {
    return thunkAPI.rejectWithValue({
      type: "network",
      body: "Network error. Please check your internet connection and try again"
    })
  } else {
    return console.log(e.message)
  }
}

class authThunksClass {
    signup = createAsyncThunk('signup', async ({username, password, name, surname}: ISignForm, thunkAPI) => {
        try {
            const {data, status} = await authAPI.signup(username, password, name as string, surname as string);
            if (status === 200) return thunkAPI.fulfillWithValue(data.message)
            return thunkAPI.rejectWithValue(data.error);
        } catch (e) {
           checkAndSendError(e, thunkAPI);
        }
    })

    signin = createAsyncThunk('signin', async ({username, password, rememberMe}: ISignForm, thunkAPI) => {
        try {
            const {data, status} = await authAPI.signin(username, password, rememberMe);
            if (status === 200) {
                localStorage.setItem("jwt-token", data.token)
                return thunkAPI.dispatch(this.getAuthProfile())
            }
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    signout = createAsyncThunk('signout', async (_, thunkAPI) => {
        try {
            return localStorage.setItem("jwt-token", "");
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    getAuthProfile = createAsyncThunk('get/auth/profile', async (_, thunkAPI) => {
        try {
            const {data, status} = await authAPI.getAuthProfile();
            console.log(status, data);
            if (status === 200) {
                return thunkAPI.dispatch(this.setAuthProfile(data.profile))
            }
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    setAuthPhoto = createAsyncThunk('set/auth/photo', async (photo: File, thunkAPI) => {
        try {
            const {data, status} = await authAPI.setAuthPhoto(photo);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.message);
            }  
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    setAuthHeader = createAsyncThunk('set/auth/header', async (photo: File, thunkAPI) => {
        try {
            const {data, status} = await authAPI.setAuthHeader(photo);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.message);
            }   
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    setAuthAboutMe = createAsyncThunk('set/auth/about/me', async (value: string, thunkAPI) => {
        try {
            const {data, status} = await authAPI.setAuthAboutMe(value);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.message);
            }  
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    setAuthStatus = createAsyncThunk('set/auth/status', async (value: string, thunkAPI) => {
        try {
            const {data, status} = await authAPI.setAuthStatus(value);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.message);
            }
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    addAuthPost = createAsyncThunk('add/auth/post', async ({Title, Description, photo}: { Title: string, Description: string, photo: File }, thunkAPI) => {
        try {
            const {data, status} = await authAPI.addPost(Title, Description, photo);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.message);
            }
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    addComment = createAsyncThunk('add/comment', async ({Title, Body, PostId}: { Title: string, Body: string, PostId: number }, thunkAPI) => {
        try {
            const {data, status} = await authAPI.addComment(Title, Body, PostId);
            if (status === 200) {
              return thunkAPI.fulfillWithValue(data.message);
            }
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    likePost = createAsyncThunk('like/post', async ({userId, postId}: {userId: string, postId: string}, thunkAPI) => {
        try {
            const {data, status} = await authAPI.likePost(userId, postId);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.message);
            }   
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    likeComment = createAsyncThunk('like/comment', async ({postId, CommentId}: { postId: number, CommentId: number }, thunkAPI) => {
        try {
            const {data, status} = await authAPI.likeComment(postId, CommentId);
            if (status === 200) {
              return thunkAPI.fulfillWithValue(data.message);
            }   
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    disLikePost = createAsyncThunk('dis/like/post', async (PostId: number, thunkAPI) => {
        try {
            const {data, status} = await authAPI.disLikePost(PostId);
            if (status === 200) {
              return thunkAPI.fulfillWithValue(data.message);
            }  
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI)
        }
    })

    disLikeComment = createAsyncThunk('dis/like/comment', async ({postId, CommentId}: { postId: number, CommentId: number }, thunkAPI) => {
        try {
            const {data, status} = await authAPI.disLikeComment(postId, CommentId);
            if (status === 200) {
              return thunkAPI.fulfillWithValue(data.message);
            }
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    setAuthProfile = createAsyncThunk('set/auth/profile', async (profile: IProfile, thunkAPI) => {
        try {
            return profile;
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    getPhotoPreview = createAsyncThunk('get/photoPreview', async (photo: File, thunkAPI) => {
        try {
            const {data, status} = await authAPI.getPhotoPreview(photo);
            if (status === 200) {
                return thunkAPI.fulfillWithValue(data.photo);
            }
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    clearPhotoPreview = createAsyncThunk('clear/photoPreview', async (_, thunkAPI) => {
        try {
            const {authReducer} = thunkAPI.getState() as RootState;
            const targetPhotoPreview = authReducer.photoPreview.split("/")[authReducer.photoPreview.split("/").length - 1] 
            const {status, data} = await authAPI.deletePhotoPreview(targetPhotoPreview);
            if (status === 200) {
                return;
            }
            return thunkAPI.rejectWithValue(data.error)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })
}

class usersThunksClass {
    getUsers = createAsyncThunk('get/users', async ({page, pageSize}: { page: number, pageSize: number }, thunkAPI) => {
            try {
                const {data, status} = await usersAPI.getUsers(page, pageSize)
                if (status === 200) {
                    return thunkAPI.fulfillWithValue({
                        users: data.users,
                        totalCount: data.totalCount
                    });
                } 
                return thunkAPI.rejectWithValue(data.error)
            } catch (e: any) {
                return checkAndSendError(e, thunkAPI);
            }
        })

    getUserById = createAsyncThunk('get/user/by/id', async (id: string, thunkAPI) => {
            try {
                const {data, status} = await usersAPI.getUserById(id)
                if (status === 200) {
                  return thunkAPI.fulfillWithValue(data.profile);
                } 
                return thunkAPI.rejectWithValue(data.error)
            } catch (e: any) {
                return checkAndSendError(e, thunkAPI);
            }
        })

    followUser = createAsyncThunk('follow/user', async (id: string, thunkAPI) => {
            try {
                const {data, status} = await usersAPI.followUser(id)
                if (status === 200) {
                    return id;
                }   
                return thunkAPI.rejectWithValue(data.error)
            } catch (e: any) {
                return checkAndSendError(e, thunkAPI);
            }
        })

    unFollowUser = createAsyncThunk('unfollow/user', async (id: string, thunkAPI) => {
            try {
                const {data, status} = await usersAPI.unFollowUser(id)
                if (status === 200) {
                    return id;
                }
                return thunkAPI.rejectWithValue(data.error)
            } catch (e: any) {
                return checkAndSendError(e, thunkAPI);
            }
        })

    setUserProfile = createAsyncThunk('set/user/profile', async (profile: IProfile, thunkAPI) => {
        try {
            return thunkAPI.fulfillWithValue(profile)
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })

    getChats = createAsyncThunk('get/chats', async (_, thunkAPI) => {
        try {
            const {data, status} = await usersAPI.getChats();
            if (status === 200) {
              return thunkAPI.fulfillWithValue({
                chats: data.chats,
                convPartners: data.convPartners
            })
            }
            return thunkAPI.rejectWithValue(data.error);
        } catch (e: any) {
            return checkAndSendError(e, thunkAPI);
        }
    })
}

export const usersThunks = new usersThunksClass();
export const authThunks = new authThunksClass();
