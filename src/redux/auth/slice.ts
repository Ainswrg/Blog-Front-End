/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { TState } from "./types";
import axios from "../../axios";
import { Status, TUser } from "../types";

export const fetchAuth = createAsyncThunk<TUser, TUser>(
  "auth/fetchAuth",
  async (params) => {
    const { data } = await axios.post<TUser>("/auth/login", params);
    return data;
  }
);
export const fetchSignUp = createAsyncThunk<TUser, TUser>(
  "auth/fetchSignup",
  async (params) => {
    const { data } = await axios.post<TUser>("/auth/register", params);
    return data;
  }
);
export const fetchAuthMe = createAsyncThunk<TUser>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await axios.get<TUser>("/auth/me");
    return data;
  }
);

const initialState: TState = {
  data: null,
  status: Status.LOADING,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending.type]: (state: TState) => {
      state.status = Status.LOADING;
      state.data = null;
    },
    [fetchAuth.fulfilled.type]: (
      state: TState,
      action: PayloadAction<TUser>
    ) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    },
    [fetchAuth.rejected.type]: (state: TState) => {
      state.data = null;
      state.status = Status.ERROR;
    },
    [fetchAuthMe.pending.type]: (state: TState) => {
      state.status = Status.LOADING;
      state.data = null;
    },
    [fetchAuthMe.fulfilled.type]: (
      state: TState,
      action: PayloadAction<TUser>
    ) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    },
    [fetchAuthMe.rejected.type]: (state: TState) => {
      state.data = null;
      state.status = Status.ERROR;
    },
    [fetchSignUp.pending.type]: (state: TState) => {
      state.status = Status.LOADING;
      state.data = null;
    },
    [fetchSignUp.fulfilled.type]: (
      state: TState,
      action: PayloadAction<TUser>
    ) => {
      state.data = action.payload;
      state.status = Status.SUCCESS;
    },
    [fetchSignUp.rejected.type]: (state: TState) => {
      state.data = null;
      state.status = Status.ERROR;
    },
  },
});

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
