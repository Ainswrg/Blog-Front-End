import { RootState } from "../store";

export const selectCommentData = (state: RootState) => state.comment;
export const selectLastComments = (state: RootState) => state.comment.lastData;
export const selectComments = (state: RootState) => state.comment.data;
