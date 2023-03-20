import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfile} from "../../models/IProfile";
import {authThunks} from "../Thunks";
import {IError} from "../../models/IError";

interface authState {
    error: IError
    isLoading: boolean
    isAuth: boolean
    captchaURL: string | null
    profile: IProfile
    message: string
}

let initialState: authState = {
    message: '',
    error: {},
    isLoading: false,
    isAuth: false,
    captchaURL: null,
    profile: {
        _id: null,
        userId: null,
        login: null,
        name: null,
        vorname: null,
        aboutMe: null,
        status: null,
        photos: {
            large: null,
            small: null,
        },
        posts: null,
        followed: null,
    },
}

export const authSlice = createSlice({
    reducers: {},
    name: "authSlice",
    initialState,
    extraReducers: {
        [authThunks.register.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = {};
            state.message = action.payload;
        },
        [authThunks.register.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.register.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.login.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
            state.isAuth = true;
        },
        [authThunks.login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.login.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.logout.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
            state.profile = {
                _id: null,
                userId: null,
                login: null,
                name: null,
                vorname: null,
                aboutMe: null,
                status: null,
                photos: {
                    large: null,
                    small: null,
                },
                posts: null,
                followed: null,
            }
            state.isAuth = false;
        },
        [authThunks.logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.logout.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.getAuthProfile.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
            state.isAuth = true;
        },
        [authThunks.getAuthProfile.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.getAuthProfile.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.setAuthPhoto.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.setAuthPhoto.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.setAuthPhoto.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.setAuthHeader.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.setAuthHeader.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.setAuthHeader.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.setAuthAboutMe.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.setAuthAboutMe.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.setAuthAboutMe.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.setAuthStatus.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.setAuthStatus.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.setAuthStatus.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.addAuthPost.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.addAuthPost.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.addAuthPost.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.addComment.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.addComment.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.addComment.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.likePost.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.likePost.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.likePost.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.likeComment.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.likeComment.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.likeComment.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.disLikePost.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.disLikePost.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.disLikePost.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.disLikeComment.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
        },
        [authThunks.disLikeComment.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.disLikeComment.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.setAuthProfile.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
            state.isLoading = false;
            state.error = {};
            state.profile = action.payload;
        },
        [authThunks.setAuthProfile.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.setAuthProfile.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        }
    }
})

export default authSlice.reducer;