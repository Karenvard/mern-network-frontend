import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IProfile} from "../../models/IProfile";
import {usersThunks} from "../Thunks";
import {IError} from "../../models/IError";
import { IMessage } from "../../models/IMessage";
import { IChat } from "../../models/IChat";

interface usersState {
    isLoading: boolean
    error: IError
    users: IProfile[]
    chats: IChat[]
    convPartners: IProfile[]
    totalCount: number
    currentUser: IProfile
    message: {
        type?: string
        body?: string
    }
}

let initialState: usersState = {
    isLoading: false,
    error: {},
    users: [],
    chats: [],
    convPartners: [],
    currentUser: {
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
        followed: null
    },
    message: {},
    totalCount: 0
}

export const usersSlice = createSlice({
    reducers: {},
    name: "usersSlice",
    initialState,
    extraReducers: {
        [usersThunks.getUsers.fulfilled.type]: (state, action: PayloadAction<{users: IProfile[], totalCount: number}>) => {
            state.isLoading = false;
            state.error = {};
            state.users = action.payload.users;
            state.totalCount = action.payload.totalCount;
        },
        [usersThunks.getUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [usersThunks.getUsers.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = {};
            state.error = action.payload;
        },

        [usersThunks.getUserById.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
            state.isLoading = false;
            state.error = {};
        },
        [usersThunks.getUserById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [usersThunks.getUserById.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = {};
            state.error = action.payload;
        },

        [usersThunks.followUser.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = {};
            state.users.forEach(u => {
                if (u.userId === action.payload) {
                    u.followed = true;
                }
            })
        },
        [usersThunks.followUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [usersThunks.followUser.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = {};
            state.error = action.payload;
        },

        [usersThunks.unFollowUser.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = {};
            state.users.forEach(u => {
                if (u.userId === action.payload) {
                    u.followed = false;
                }
            })
        },
        [usersThunks.unFollowUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [usersThunks.unFollowUser.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = {};
            state.error = action.payload;
        },

        [usersThunks.setUserProfile.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
            state.isLoading = false;
            state.error = {};
            state.currentUser = action.payload;
        },
        [usersThunks.setUserProfile.pending.type]: (state) => {
            state.isLoading = true;
        },
        [usersThunks.setUserProfile.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = {};
            state.error = action.payload;
        },

        [usersThunks.getChats.fulfilled.type]: (state, action: PayloadAction<{chats: IChat[], convPartners: IProfile[]}>) => {
            state.isLoading = false;
            state.error = {};
            state.chats = action.payload.chats;
            state.convPartners = action.payload.convPartners;
        },
        [usersThunks.getChats.pending.type]: (state) => {
            state.isLoading = true;
        },
        [usersThunks.getChats.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.message = {};
            state.error = action.payload;
        }
    }
})

export default usersSlice.reducer;

