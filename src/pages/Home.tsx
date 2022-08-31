import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Post, CommentsBlock, TagsBlock } from "../components";
import { fetchPosts, fetchTags, setPostTitle } from "../redux/posts/slice";
import { useAppDispatch } from "../redux/store";
import { selectPostData } from "../redux/posts/selectors";
import { Status } from "../redux/types";
import { selectAuth } from "../redux/auth/selectors";
import { ExtendedPostProps } from "../redux/posts/types";
import { selectFilter } from "../redux/filter/selectors";
import { setFilters, setSortType } from "../redux/filter/slice";
import { SortPropertyEnum } from "../redux/filter/types";
import { selectLastComments } from "../redux/comments/selectors";
import { fetchLastFiveComments } from "../redux/comments/slice";

enum ActiveTab {
  NEW = 0,
  POPULAR = 1,
}

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectAuth);
  const navigate = useNavigate();
  const { posts, tags, postsTitle } = useSelector(selectPostData);
  const { sort, tagCategory } = useSelector(selectFilter);
  const lastData = useSelector(selectLastComments);
  const isMounted = React.useRef(false);
  const [active, setActive] = React.useState(0);

  const isPostLoading = posts.status === Status.LOADING;
  const isTagsLoading = tags.status === Status.LOADING;

  const getPosts = React.useCallback(async () => {
    const order = sort.includes("-") ? "asc" : "desc";
    const sortBy = sort.replace("-", "");

    const { category } = qs.parse(window.location.search.substring(1));
    const titleCategory: string = category
      ? category.toString().substring(0, 1).toUpperCase() +
        category.toString().substring(1)
      : "";
    dispatch(setPostTitle(titleCategory));
    dispatch(
      fetchPosts({
        sort: sortBy,
        order,
        tagCategory: category as string,
      })
    );
    dispatch(fetchLastFiveComments());
    window.scrollTo(0, 0);
  }, [dispatch, sort]);

  const onClickTab = (sortType: SortPropertyEnum, activeTab: ActiveTab) => {
    dispatch(setSortType(sortType));
    setActive(activeTab);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFilters({
          sort: params.sort,
          tagCategory: params.category || "",
        })
      );
      navigate("/");
    }
  }, [dispatch, navigate]);

  React.useEffect(() => {
    if (isMounted.current) {
      const order = sort.includes("-") ? "asc" : "desc";
      const sortBy = sort.replace("-", "");
      const params = {
        sort: sortBy,
        order,
        category: tagCategory,
      };
      const queryString = qs.stringify(params, {
        skipNulls: true,
        addQueryPrefix: true,
      });
      navigate(`${queryString}`);
    }
    isMounted.current = true;
    dispatch(fetchTags());
    getPosts();
  }, [dispatch, getPosts, navigate, sort, tagCategory]);

  return (
    <>
      <Typography gutterBottom align="center" variant="h3">
        {postsTitle}
      </Typography>
      <Tabs
        style={{ marginBottom: 15 }}
        value={active}
        aria-label="basic tabs example"
      >
        <Tab
          label="New"
          onClick={() => onClickTab(SortPropertyEnum.NEW_DESC, ActiveTab.NEW)}
        />
        <Tab
          label="Popular"
          onClick={() =>
            onClickTab(SortPropertyEnum.POPULAR_DESC, ActiveTab.POPULAR)
          }
        />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map(
            (obj: ExtendedPostProps, i: number) =>
              isPostLoading ? (
                <Post
                  key={i}
                  isLoading={true}
                  id={"0"}
                  title={""}
                  createdAt={""}
                  imageUrl={""}
                  user={{
                    fullName: "",
                    avatarUrl: "",
                  }}
                  viewsCount={0}
                  commentsCount={0}
                  tags={[]}
                />
              ) : (
                <Post
                  key={obj._id}
                  id={obj._id}
                  title={obj.title}
                  imageUrl={
                    obj.imageUrl ? `http://localhost:4444/${obj.imageUrl}` : ""
                  }
                  user={obj.user}
                  createdAt={obj.createdAt}
                  viewsCount={obj.viewsCount}
                  commentsCount={obj.commentsCount}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={lastData.comments}
            isLoading={lastData.status}
          />
        </Grid>
      </Grid>
    </>
  );
};
