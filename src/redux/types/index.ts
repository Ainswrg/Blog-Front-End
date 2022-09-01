export type TUser = {
  _id?: string;
  fullName?: string;
  email?: string;
  passwordHash?: string;
  avatarUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};
export const enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export const enum Request {
  GET_POSTS = "/posts/get",
  POSTS = "/posts",
  TAGS = "/posts/tags",
  LOGIN = "/auth/login",
  REGISTER = "/auth/register",
  GET_ME = "/auth/me",
  COMMENTS = "/comments",
  GET_LAST_FIVE_COMMENTS = "/comments/getLastFive",
}
