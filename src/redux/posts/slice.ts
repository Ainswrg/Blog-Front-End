/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPostSlice, PostProps } from "./types";
import axios from "../../axios";
import { Status } from "../types";

export const fetchPosts = createAsyncThunk<PostProps[]>(
  "posts/fetchPosts",
  async () => {
    const { data } = await axios.get<PostProps[]>("/posts");

    return data;
  }
);
export const fetchTags = createAsyncThunk<PostProps[]>(
  "posts/fetchTags",
  async () => {
    const { data } = await axios.get<PostProps[]>("/tags");

    return data;
  }
);

const initialState: IPostSlice = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
  tags: {
    items: [],
    status: Status.LOADING,
  },
};

const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {},
  extraReducers: {
    [fetchPosts.pending.type]: (state: IPostSlice) => {
      state.posts.items = [];
      state.posts.status = Status.LOADING;
    },
    [fetchPosts.fulfilled.type]: (
      state: IPostSlice,
      action: PayloadAction<PostProps[]>
    ) => {
      state.posts.items = action.payload;
      state.posts.status = Status.SUCCESS;
    },
    [fetchPosts.rejected.type]: (state: IPostSlice) => {
      state.posts.items = [];
      state.posts.status = Status.ERROR;
    },
    [fetchTags.pending.type]: (state: IPostSlice) => {
      state.tags.items = [];
      state.tags.status = Status.LOADING;
    },
    [fetchTags.fulfilled.type]: (
      state: IPostSlice,
      action: PayloadAction<string[]>
    ) => {
      state.tags.items = action.payload;
      state.tags.status = Status.SUCCESS;
    },
    [fetchTags.rejected.type]: (state: IPostSlice) => {
      state.tags.items = [];
      state.tags.status = Status.ERROR;
    },
  },
});

export const postsReducer = postSlice.reducer;
