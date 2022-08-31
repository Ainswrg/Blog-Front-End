import { Status, TUser } from "../types";

export interface CommentProps {
  _id?: string;
  post?: string;
  text?: string;
  user: TUser;
  createdAt: string;
  updatedAt?: string;
  __v?: number;
}

export type Meta = {
  arg?: string;
  requestId: string;
  requestStatus: string;
};

export type Action = {
  type: string;
  meta: Meta;
  payload: CommentProps[];
};

export type DataProps = {
  data: CommentProps[];
};

export interface IState {
  comments: CommentProps[];
  status: Status;
}

export interface ICommentSlice {
  data: IState;
  lastData: IState;
}
