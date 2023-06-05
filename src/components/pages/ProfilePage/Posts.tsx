import { FC, useState } from "react";
// @ts-ignore
import classes from "./ProfilePage.module.scss";
// @ts-ignore
import heartOutlineICON from "./../../../assets/icons/outlineHeartIcon.png";
// @ts-ignore
import commentICON from "./../../../assets/icons/commentIcon.png";
import { useAppSelector } from "../../../utils/hooks";
import { IPost } from "../../../utils/models/IPost";




const Posts: FC = () => {
  const posts = useAppSelector(state => state.authReducer.profile.posts) as IPost[];
  const [pageSize, setPageSize] = useState<number>(4);
  const [page, setPage] = useState<number>(1);


  return <></>
}

export default Posts;
