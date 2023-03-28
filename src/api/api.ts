import axios from "axios";
import { IChat } from "../models/IChat";
import { IProfile } from "../models/IProfile";

const $host = axios.create({
    baseURL: "http://localhost:5555/1.0/api",
})

const $authHost = axios.create({
    baseURL: "http://localhost:5555/1.0/api"
})

$authHost.interceptors.request.use((config: any) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('jwt-token')}`
    return config
})

class authAPIClass {
    register(login: string, password: string, name?: string, vorname?: string) {
        return $host.post("/auth/register", {login, password, name, vorname})
    }

    login(login: string, password: string, rememberMe?: boolean) {
        return $host.post("/auth/login", {login, password, rememberMe})
    }

    getAuthProfile() {
        return $authHost.get("/auth/profile")
    }

    setAuthPhoto(photo: File) {
        const formData = new FormData()
        formData.append("photo", photo)
        return $authHost.post("/auth/photo", formData)
    }

    setAuthHeader(photo: File) {
        const formData = new FormData()
        formData.append("photo", photo)
        return $authHost.post("/auth/header", {formData})
    }

    setAuthAboutMe(value: string) {
        return $authHost.post("/auth/aboutMe", {value})
    }

    setAuthStatus(value: string) {
        return $authHost.post("/auth/status", {value})
    }

    addPost(Title: string, Description: string, photo: File) {
        const formData = new FormData();
        formData.append('photo', photo)
        return $authHost.post("/auth/addPost", {Title, Description, formData})
    }

    addComment(Title: string, Body: string, PostId: number) {
        return $authHost.post("/auth/addComment", {Title, Body})
    }

    likePost(userId: string, postId: string) {
        return $authHost.post("/auth/likePost", {userId, postId})
    }

    likeComment(PostId: Number, CommentId: Number) {
        return $authHost.post("/auth/likeComment", {PostId, CommentId})
    }

    disLikePost(PostId: Number) {
        return $authHost.post("/auth/disLikePost", {PostId})
    }

    disLikeComment(PostId: Number, CommentId: Number) {
        return $authHost.post("/auth/disLikeComment", {PostId, CommentId})
    }
}

class usersAPIClass {
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
}

export const authAPI = new authAPIClass();
export const usersAPI = new usersAPIClass();
