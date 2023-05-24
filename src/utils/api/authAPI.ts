import {$host, $authHost} from "./api";

class authAPI {
    register(login: string, password: string, name?: string, surname?: string) {
        return $host.post("/auth/register", {login, password, name, surname})
    }

    login(login: string, password: string, rememberMe: boolean = false) {
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
        console.log("eye")
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
