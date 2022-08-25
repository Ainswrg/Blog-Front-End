import { RootState } from "../store";

const selectSort = (state: RootState) => state.filter.sort;
const selectFilter = (state: RootState) => state.filter;

export { selectSort, selectFilter };
