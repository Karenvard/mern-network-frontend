import { ServerMessage } from "../models/ServerMessage";
import {IError} from "../models/IError"
import {$host, $authHost} from "./api";
import { IProfile } from "../models/IProfile";

class authAPI {
    signup(username: string, password: string, name: string, surname: string) {
        return $host.post<ServerMessage & {error: IError}>("/auth/signup", {username, password, name, surname})
    }

    signin(username: string, password: string, rememberMe: boolean = false) {
        return $host.post<ServerMessage & {error: IError, token: string}>("/auth/signin", {username, password, rememberMe})
    }

    getAuthProfile() {
        return $authHost.get<{profile: IProfile} & {error: IError}>("/auth/profile")
    }

    setAuthPhoto(photo: File) {
        const formData = new FormData()
        formData.append("photo", photo)
        return $authHost.post<ServerMessage & {error: IError}>("/auth/photo", formData)
    }

    setAuthHeader(photo: File) {
        const formData = new FormData()
        formData.append("photo", photo)
        return $authHost.post<ServerMessage & {error: IError}>("/auth/header", formData)
    }

    setAuthAboutMe(value: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/aboutMe", {value})
    }

    setAuthStatus(value: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/status", {value})
    }

    addPost(Title: string, Description: string, photo: File) {
        const formData = new FormData();
        formData.append('photo', photo)
        return $authHost.post<ServerMessage & {error: IError}>("/auth/addPost", {Title, Description, formData})
    }

    addComment(Title: string, Body: string, PostId: number) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/addComment", {Title, Body, PostId})
    }

    likePost(userId: string, postId: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/likePost", {userId, postId})
    }

    likeComment(PostId: Number, CommentId: Number) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/likeComment", {PostId, CommentId})
    }

    disLikePost(PostId: Number) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/disLikePost", {PostId})
    }

    disLikeComment(PostId: Number, CommentId: Number) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/disLikeComment", {PostId, CommentId})
    }

    getPhotoPreview(photo: File) {
        const formData = new FormData();
        formData.append("photo", photo);
        return $authHost.post<ServerMessage & {error: IError, photo: string}>("/auth/photoPreview", formData);
    }

    deletePhotoPreview(fileName: string) {
        return $authHost.post<ServerMessage & {error: IError}>("/auth/deletePhotoPreview", {fileName});
    }
}

export default new authAPI();
