export type TUser = {
  _id?: string;
  fullName: string;
  email?: string;
  passwordHash?: string;
  avatarUrl: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export interface ExtendedPostProps extends PostProps {
  id: number;
  imageUrl?: string;
  commentsCount?: number;
  children?: string;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
}

export interface PostProps {
  _id?: string;
  title: string;
  text?: string;
  tags: string[];
  viewsCount: number;
  user: TUser;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export const enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface IPost {
  items: PostProps[];
  status: Status;
}

export interface IPostSlice {
  posts: IPost;
  tags: IPost;
}
