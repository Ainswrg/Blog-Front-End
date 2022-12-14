import React from "react";
import { CommentProps } from "../comments/types";
import { Status, TUser } from "../types";

export interface ExtendedPostProps extends PostProps {
  imageUrl?: string;
  children?: React.ReactNode | string;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
}

export interface PostProps {
  _id?: string;
  id?: string;
  title: string;
  text?: string;
  tags: string[];
  viewsCount: number;
  user: TUser;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
  commentsCount: number;
  comments: CommentProps[];
}

export interface IPost {
  items: ExtendedPostProps[];
  status: Status;
}
export interface IPostTags {
  items: string[];
  status: Status;
}

export interface IPostSlice {
  posts: IPost;
  tags: IPostTags;
  postsTitle: string;
}

export type Meta = {
  arg?: string;
  requestId: string;
  requestStatus: string;
};

export type Action = {
  type: string;
  meta: Meta;
  payload: PostProps[];
};

export type DataProps = {
  data: PostProps[];
};

export type Params = {
  sort: string;
  order: string;
  tagCategory: string;
};
