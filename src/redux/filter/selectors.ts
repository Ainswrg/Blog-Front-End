import { RootState } from "../store";

const selectSort = (state: RootState) => state.filter.sort;
const selectFilter = (state: RootState) => state.filter;
const selectTagCategory = (state: RootState) => state.filter.tagCategory;

export { selectSort, selectFilter, selectTagCategory };
