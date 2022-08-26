export enum SortPropertyEnum {
  NEW_DESC = "createdAt",
  NEW_ASC = "-createdAt",
  POPULAR_DESC = "viewsCount",
  POPULAR_ASC = "-viewsCount",
}

export type FilterSliceState = {
  sort: SortPropertyEnum;
  tagCategory: string;
};
