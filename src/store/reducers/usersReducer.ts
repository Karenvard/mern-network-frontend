import {createSlice, PayloadAction, Slice} from "@reduxjs/toolkit";
import {IProfile} from "../../utils/models/IProfile";
import {usersThunks} from "../Thunks";
import {IError} from "../../utils/models/IError";
import { IMessage } from "../../utils/models/IMessage";
import { IChat } from "../../utils/models/IChat";

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
        id: null,
        username: null,
        name: null,
        surname: null,
        aboutMe: null,
        status: null,
        avatar: null,
        header: null,
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
                if (u.id === action.payload) {
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
                if (u.id === action.payload) {
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

