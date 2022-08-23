import { Status, TUser } from "../types";

export type TLoginValues = {
  email: string;
  password: string;
};
export type TSignUpValues = {
  fullName: string;
  email: string;
  password: string;
};

export type TState = {
  data: TUser | null;
  status: Status;
};
