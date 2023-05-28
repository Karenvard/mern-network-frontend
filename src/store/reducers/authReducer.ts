import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {IProfile} from "../../utils/models/IProfile";
import {authThunks} from "../Thunks";
import {IError} from "../../utils/models/IError";

interface authState {
    error: IError
    isLoading: boolean  
    isAuth: boolean
    activePopups: string[]
    captchaURL: string
    photoPreview: string
    profile: IProfile
    message: string
}

let initialState: authState = {
    message: '',
    error: {},
    isLoading: false,
    isAuth: false,
    activePopups: [],
    captchaURL: '',
    photoPreview: '',
    profile: {
        id: null,
        username: null,
        name: null,
        surname: null,
        aboutMe: null,
        status: null,
        avatar: null,
        header: null,
        posts: null,
        followed: null,
    },
}

export const authSlice: Slice<authState> = createSlice({
    reducers: {},
    name: "authSlice",
    initialState,
    extraReducers: {
        [authThunks.signup.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = {};
            state.message = action.payload;
        },
        [authThunks.signup.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.signup.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.signin.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
            state.isAuth = true;
        },
        [authThunks.signin.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.signin.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },

        [authThunks.signout.fulfilled.type]: (state) => {
            state.isLoading = false;
            state.error = {};
            state.profile = {
                id: null, 
                username: null,
                name: null,
                surname: null,
                aboutMe: null,
                status: null,
                avatar: null,
                header: null,
                posts: null,
                followed: null,
            }
            state.isAuth = false;
        },
        [authThunks.signout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.signout.rejected.type]: (state, action: PayloadAction<IError>) => {
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
            state.isAuth = false;
            state.profile = {
                id: null,
                username: null,
                name: null,
                surname: null,
                aboutMe: null,
                status: null,
                avatar: null,
                header: null,
                posts: null,
                followed: null,
            }
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
        },

        [authThunks.getPhotoPreview.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = {};
            state.photoPreview = action.payload;
        },
        [authThunks.getPhotoPreview.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.getPhotoPreview.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = '';
            state.error = action.payload;
        },


        [authThunks.clearPhotoPreview.fulfilled.type]: (state, action: PayloadAction) => {
            state.isLoading = false;
            state.error = {};
            state.photoPreview = "";
        },
        [authThunks.clearPhotoPreview.pending.type]: (state) => {
            state.isLoading = true;
        },
        [authThunks.clearPhotoPreview.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = "";
            state.error = action.payload;
        }
    }
})

export default authSlice.reducer;
