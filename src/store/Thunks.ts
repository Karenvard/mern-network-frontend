import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import authAPI from "../utils/api/authAPI";
import usersAPI from "../utils/api/usersAPI";
import { IProfile } from "../utils/models/IProfile";
import { ISignForm } from "../utils/models/ISignForm";

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
  } else if (e instanceof AxiosError) {
    console.clear();
    return thunkAPI.rejectWithValue(e.response?.data.error || { type: "unknown", message: "Server error. Please try later." });
  } else {
    console.log(e);
  }
}

class authThunksClass {
  signup = createAsyncThunk('signup', async ({ username, password, name, surname }: ISignForm, thunkAPI) => {
    try {
      const { data } = await authAPI.signup(username, password, name as string, surname as string);
      return thunkAPI.fulfillWithValue(data.message)
    } catch (e: any) {
      checkAndSendError(e, thunkAPI);
    }
  })

  signin = createAsyncThunk('signin', async ({ username, password, rememberMe }: ISignForm, thunkAPI) => {
    try {
      const { data } = await authAPI.signin(username, password, rememberMe);
      localStorage.setItem("jwt-token", data.token)
      return thunkAPI.dispatch(this.getAuthProfile())
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
      const { data } = await authAPI.getProfile();
      return thunkAPI.dispatch(this.setAuthProfile(data.profile))
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  setAuthPhoto = createAsyncThunk('set/auth/photo', async (photo: File, thunkAPI) => {
    try {
      const { data } = await authAPI.setAvatar(photo);
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  setAuthHeader = createAsyncThunk('set/auth/header', async (photo: File, thunkAPI) => {
    try {
      const { data } = await authAPI.setHeader(photo);
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  setAuthAboutMe = createAsyncThunk('set/auth/about/me', async (value: string, thunkAPI) => {
    try {
      const { data } = await authAPI.setAboutMe(value);
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  setAuthStatus = createAsyncThunk('set/auth/status', async (value: string, thunkAPI) => {
    try {
      const { data } = await authAPI.setStatus(value);
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  addAuthPost = createAsyncThunk('add/auth/post', async ({ Title, Description, photo }: { Title: string, Description: string, photo: File }, thunkAPI) => {
    try {
      const { data } = await authAPI.addPost(Title, Description, photo);
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  addComment = createAsyncThunk('add/comment', async ({ Title, Body, PostId }: { Title: string, Body: string, PostId: number }, thunkAPI) => {
    try {
      const { data } = await authAPI.addComment(Title, Body, PostId);
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  likePost = createAsyncThunk('like/post', async ({ userId, postId }: { userId: string, postId: string }, thunkAPI) => {
    try {
      const { data } = await authAPI.likePost(userId, postId);
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  likeComment = createAsyncThunk('like/comment', async ({ userId, postId, commentId }: { postId: string, commentId: string, userId: string }, thunkAPI) => {
    try {
      const { data } = await authAPI.likeComment(userId, postId, commentId);
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  disLikePost = createAsyncThunk('dis/like/post', async ({ postId, userId }: { postId: string, userId: string }, thunkAPI) => {
    try {
      const { data } = await authAPI.disLikePost(userId, postId);
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI)
    }
  })

  disLikeComment = createAsyncThunk('dis/like/comment', async ({ userId, postId, commentId }: { postId: string, commentId: string, userId: string }, thunkAPI) => {
    try {
      const { data } = await authAPI.disLikeComment(userId, postId, commentId);
      return thunkAPI.fulfillWithValue(data.message);
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

  clearAvatar = createAsyncThunk('clear/avatar', async (_, thunkAPI) => {
    try {
      const { data } = await authAPI.clearAvatar();
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.fulfillWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  clearHeader = createAsyncThunk('clear/header', async (_, thunkAPI) => {
    try {
      const { data } = await authAPI.clearHeader();
      thunkAPI.dispatch(this.getAuthProfile());
      return thunkAPI.rejectWithValue(data.message);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })
}

class usersThunksClass {
  getUsers = createAsyncThunk('get/users', async ({ page, pageSize }: { page: number, pageSize: number }, thunkAPI) => {
    try {
      const { data } = await usersAPI.getUsers(page, pageSize)
      return thunkAPI.fulfillWithValue({
        users: data.users,
        totalCount: data.totalCount
      });
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  getUserById = createAsyncThunk('get/user/by/id', async (id: string, thunkAPI) => {
    try {
      const { data } = await usersAPI.getUserById(id)
      return thunkAPI.fulfillWithValue(data.profile);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  followUser = createAsyncThunk('follow/user', async (id: string, thunkAPI) => {
    try {
      await usersAPI.followUser(id)
      return thunkAPI.fulfillWithValue(id);
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })

  unFollowUser = createAsyncThunk('unfollow/user', async (id: string, thunkAPI) => {
    try {
      await usersAPI.unFollowUser(id)
      return thunkAPI.fulfillWithValue(id);
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
      const { data } = await usersAPI.getChats();
      return thunkAPI.fulfillWithValue({
        chats: data.chats,
        convPartners: data.convPartners
      })
    } catch (e: any) {
      return checkAndSendError(e, thunkAPI);
    }
  })
}

export const usersThunks = new usersThunksClass();
export const authThunks = new authThunksClass();
