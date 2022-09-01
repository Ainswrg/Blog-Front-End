/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CommentProps, DataProps, ICommentSlice } from "./types";
import axios from "../../axios";
import { Request, Status } from "../types";

export const fetchComments = createAsyncThunk<CommentProps[], string>(
  "comments/fetchComments",
  async (id: string) => {
    const { data } = await axios.get<CommentProps[], DataProps>(
      `${Request.COMMENTS}/${id}`
    );

    return data;
  }
);
export const fetchLastFiveComments = createAsyncThunk<CommentProps[]>(
  "comments/fetchLastFiveComments",
  async () => {
    const { data } = await axios.get<CommentProps[], DataProps>(
      Request.GET_LAST_FIVE_COMMENTS
    );

    return data;
  }
);
export const fetchRemoveComment = createAsyncThunk(
  "comments/fetchRemoveComment",
  async (id: string) => {
    await axios.delete(`${Request.COMMENTS}/${id}`);

    return { message: "Success" };
  }
);

const initialState: ICommentSlice = {
  data: {
    comments: [],
    status: Status.LOADING,
  },
  lastData: {
    comments: [],
    status: Status.LOADING,
  },
};

const commentSlice = createSlice({
  name: "comments",
  initialState,

  reducers: {},
  extraReducers: {
    // get comment
    [fetchComments.pending.type]: (state: ICommentSlice) => {
      state.data.comments = [];
      state.data.status = Status.LOADING;
    },
    [fetchComments.fulfilled.type]: (
      state: ICommentSlice,
      action: PayloadAction<CommentProps[]>
    ) => {
      state.data.comments = action.payload;
      state.data.status = Status.SUCCESS;
    },
    [fetchComments.rejected.type]: (state: ICommentSlice) => {
      state.data.comments = [];
      state.data.status = Status.ERROR;
    },
    // get last 5 comment
    [fetchLastFiveComments.pending.type]: (state: ICommentSlice) => {
      state.lastData.comments = [];
      state.lastData.status = Status.LOADING;
    },
    [fetchLastFiveComments.fulfilled.type]: (
      state: ICommentSlice,
      action: PayloadAction<CommentProps[]>
    ) => {
      state.lastData.comments = action.payload;
      state.lastData.status = Status.SUCCESS;
    },
    [fetchLastFiveComments.rejected.type]: (state: ICommentSlice) => {
      state.lastData.comments = [];
      state.lastData.status = Status.ERROR;
    },
    // remove comment
    [fetchRemoveComment.pending.type]: (state: ICommentSlice) => {
      state.data.comments = [];
    },
  },
});

export const commentReducer = commentSlice.reducer;
