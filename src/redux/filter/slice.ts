/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  sort: SortPropertyEnum.NEW_DESC,
  tagCategory: "",
};

const filterSlice: Slice<FilterSliceState> = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortPropertyEnum>) => {
      state.sort = action.payload;
    },
    setCategoryType: (state, action: PayloadAction<string>) => {
      state.tagCategory = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.tagCategory = action.payload.tagCategory;
      } else {
        state.sort = SortPropertyEnum.POPULAR_DESC;
        state.tagCategory = "";
      }
    },
  },
});

export const { setSortType, setFilters, setCategoryType } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
