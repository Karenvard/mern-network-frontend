import { ServerMessage } from "../models/ServerMessage";
import {$host, $authHost} from "./api";

class authAPI {
    signup(username: string, password: string, name: string, surname: string) {
        return $host.post<ServerMessage>("/auth/signup", {username, password, name, surname})
    }

    signin(username: string, password: string, rememberMe: boolean = false) {
        return $host.post("/auth/signin", {username, password, rememberMe})
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
        return $authHost.post("/auth/header", formData)
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

    getPhotoPreview(photo: File) {
        const formData = new FormData();
        formData.append("photo", photo);
        return $authHost.post("/auth/photoPreview", formData);
    }

    deletePhotoPreview(fileName: string) {
        return $authHost.post("/auth/deletePhotoPreview", {fileName});
    }
}

export default new authAPI();
