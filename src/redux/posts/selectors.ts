import { RootState } from "../store";

export const selectPostData = (state: RootState) => state.posts;
export const selectPostsTitle = (state: RootState) => state.posts.postsTitle;
