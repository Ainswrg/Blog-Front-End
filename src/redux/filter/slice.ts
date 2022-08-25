/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
  sort: SortPropertyEnum.NEW_DESC,
};

const filterSlice: Slice<FilterSliceState> = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortType: (state, action: PayloadAction<SortPropertyEnum>) => {
      state.sort = action.payload;
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
      } else {
        state.sort = SortPropertyEnum.POPULAR_DESC;
      }
    },
  },
});

export const { setSortType, setFilters } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
