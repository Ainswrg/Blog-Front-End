import { RootState } from "../store";

export const selectIsEditable = (state: RootState) => state.comment.isEditable;
export const selectComment = (state: RootState) => state.comment.comment;
export const selectLastComments = (state: RootState) => state.comment.lastData;
export const selectComments = (state: RootState) => state.comment.data;
