import {IPost} from "./IPost";

export interface IProfile {
    id: string | null,
    username:  string | null
    name:   string | null
    surname: string | null
    aboutMe: string | null
    status: string | null
    avatar: string | null,
    header: string | null,
    posts: IPost[] | null
    followed: boolean | null
}
