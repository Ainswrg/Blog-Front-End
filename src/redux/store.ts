import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { postsReducer } from "./posts/slice";
import { authReducer } from "./auth/slice";
import { filterReducer } from "./filter/slice";
import { commentReducer } from "./comments/slice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    filter: filterReducer,
    comment: commentReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
