import { Status, TUser } from "../types";

export interface ExtendedPostProps extends PostProps {
  imageUrl?: string;
  commentsCount?: number;
  children?: string;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
}

export interface PostProps {
  _id?: string | number;
  id?: string | number;
  title: string;
  text?: string;
  tags: string[];
  viewsCount: number;
  user: TUser;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export interface IPost {
  items: PostProps[];
  status: Status;
}
export interface IPostTags {
  items: string[];
  status: Status;
}

export interface IPostSlice {
  posts: IPost;
  tags: IPostTags;
}
