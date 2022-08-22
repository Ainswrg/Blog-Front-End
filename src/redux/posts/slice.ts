/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPostSlice, PostProps, Status } from "./types";
import axios from "../../axios";

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
  },
});

export const posts = postSlice.reducer;
