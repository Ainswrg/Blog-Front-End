/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IPostSlice, PostProps, Action, Params, DataProps } from "./types";
import axios from "../../axios";
import { Status } from "../types";

export const fetchPosts = createAsyncThunk<PostProps[], Params>(
  "posts/fetchPosts",
  async (params) => {
    const querySort = params.sort ? `?sort=${params.sort}` : "";
    const queryOrder = params.order ? `&order=${params.order}` : "";
    const queryCategory = params.tagCategory
      ? `&category=${params.tagCategory}`
      : "";
    const { data } = await axios.get<PostProps[], DataProps>(
      `/posts${querySort}${queryOrder}${queryCategory}`
    );

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
export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id: string) => {
    await axios.delete(`/posts/${id}`);

    return { message: "Success" };
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
  postsTitle: "",
};

const postSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    setPostTitle: (state: IPostSlice, action: PayloadAction<string>) => {
      state.postsTitle = action.payload;
    },
  },
  extraReducers: {
    // get posts
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
    // get tags
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
    // remove post
    [fetchRemovePost.pending.type]: (state: IPostSlice, action: Action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});
export const { setPostTitle } = postSlice.actions;
export const postsReducer = postSlice.reducer;
