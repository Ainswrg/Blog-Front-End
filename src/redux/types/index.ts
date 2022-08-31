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
  posts = "/posts",
  tags = "/tags",
  login = "/auth/login",
  register = "/auth/register",
  getMe = "/auth/me",
  comments = "/comments",
}
