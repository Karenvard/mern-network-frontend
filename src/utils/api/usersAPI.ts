import {$authHost} from "./api";
import {IChat} from "../models/IChat"
import { IProfile } from "../models/IProfile";
import { IError } from "../models/IError";


class usersAPI {
    getUsers(page: number, pageSize: number) {
        return $authHost.get<{users: IProfile[], totalCount: number, error: IError}>(`/users/data?page=${page}&pageSize=${pageSize}`)
    }

    getUserById(id: string) {
        return $authHost.get<{profile: IProfile, error: IError}>(`/users/data/${id}`)
    }

    followUser(id: string) {
        return $authHost.get<{error: IError}>(`/users/follow/${id}`)
    }

    unFollowUser(id: string) {
        return $authHost.get<{error: IError}>(`/users/unfollow/${id}`)
    }

    startChat(id: string) {
        return $authHost.post<{error: IError}>(`/users/start/chat`, {id})
    }

    getChats() {
        return $authHost.get<{chats: IChat[], convPartners: {userId: string}[], error: IError}>(`/users/chats`)
    }

    sendMessage(to: string, text: string) {
        return $authHost.post<{error: IError}>(`/users/sendMessage`, {to, text})
    }
}

export default new usersAPI();
