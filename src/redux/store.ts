import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { posts } from "./posts/slice";

const store = configureStore({
  reducer: { posts },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
