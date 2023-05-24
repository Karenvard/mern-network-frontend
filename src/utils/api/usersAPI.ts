import {$authHost} from "./api";
import {IChat} from "./../models/IChat";

class usersAPI {
    getUsers(page: number, pageSize: number) {
        return $authHost.get(`/users/data?page=${page}&pageSize=${pageSize}`)
    }

    getUserById(id: string) {
        return $authHost.get(`/users/data/${id}`)
    }

    followUser(id: string) {
        return $authHost.get(`/users/follow/${id}`)
    }

    unFollowUser(id: string) {
        return $authHost.get(`/users/unfollow/${id}`)
    }

    startChat(id: string) {
        return $authHost.post(`/users/start/chat`, {id})
    }

    getChats() {
        return $authHost.get(`/users/chats`)
    }

    sendMessage(chat: IChat, text: string) {
        return $authHost.post(`/users/send/message`, {chat, text})
    }

    getLastMessage(partnerId: string) {
        return $authHost.post(`/users/chats/lastMessage`, {partnerId})
    }
}

export default new usersAPI();
