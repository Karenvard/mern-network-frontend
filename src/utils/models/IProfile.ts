import {IPost} from "./IPost";

export interface IProfile {
    _id:    string | null
    userId: string | null
    login:  string | null
    name:   string | null
    surname: string | null
    aboutMe: string | null
    status: string | null
    photos: {
        large: string | null
        small: string | null
    },
    posts: IPost[] | null
    followed: boolean | null
}