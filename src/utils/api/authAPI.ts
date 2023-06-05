import { ServerMessage } from "../models/ServerMessage";
import {IError} from "../models/IError"
import {$host, $authHost} from "./api";
import { IProfile } from "../models/IProfile";
import { IPost } from "../models/IPost";

class authAPI {
    signup(username: string, password: string, name: string, surname: string) {
        return $host.post<ServerMessage & {error: IError}>("/auth/signup", {username, password, name, surname})
    }

    signin(username: string, password: string, rememberMe: boolean = false) {
        return $host.post<ServerMessage & {error: IError, token: string}>("/auth/signin", {username, password, rememberMe})
    }

    getProfile() {
        return $authHost.get<{profile: IProfile} & {error: IError}>("/auth/profile")
    }
    
    getPosts() {
        return $authHost.get<{posts: IPost[]}>("/auth/posts?pageSize=${pageSize}");
    }

    setAvatar(photo: File) {
        const formData = new FormData()
        formData.append("photo", photo)
        return $authHost.post<ServerMessage & {error: IError}>("/auth/photo", formData)
    }

    setHeader(photo: File) {
        const formData = new FormData()
        formData.append("photo", photo)
        return $authHost.post<ServerMessage & {error: IError}>("/auth/header", formData)
    }

    setAboutMe(aboutMe: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/aboutMe", {aboutMe})
    }

    setStatus(status: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/status", {status})
    }

    addPost(Title: string, Description: string, photo: File) {
        const formData = new FormData();
        formData.append('photo', photo)
        return $authHost.post<ServerMessage & {error: IError}>("/auth/addPost", {Title, Description, ...formData});
    }

    addComment(Title: string, Body: string, PostId: number) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/addComment", {Title, Body, PostId})
    }

    likePost(userId: string, postId: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/likePost", {userId, postId})
    }

    likeComment(postId: string, commentId: string, userId: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/likeComment", {postId, commentId, userId})
    }

    disLikePost(postId: string, userId: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/disLikePost", {postId, userId})
    }

    disLikeComment(postId: string, commentId: string, userId: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/disLikeComment", {userId, postId, commentId})
    }

    clearAvatar() {
      return $authHost.delete<ServerMessage & {error: IError}>("/auth/clearAvatar");
    }

    clearHeader() {
      return $authHost.delete<ServerMessage & {error: IError}>("/auth/clearHeader");
    }
}

export default new authAPI();
