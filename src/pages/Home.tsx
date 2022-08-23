import React from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post, CommentsBlock, TagsBlock } from "../components";
import { fetchPosts, fetchTags } from "../redux/posts/slice";
import { useAppDispatch } from "../redux/store";
import { selectPostData } from "../redux/posts/selectors";
import { Status } from "../redux/types";
import { selectAuth } from "../redux/auth/selectors";
import { ExtendedPostProps } from "../redux/posts/types";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const userData = useSelector(selectAuth);
  const { posts, tags } = useSelector(selectPostData);
  const isPostLoading = posts.status === Status.LOADING;
  const isTagsLoading = tags.status === Status.LOADING;

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);
  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map(
            (obj: ExtendedPostProps, i) =>
              isPostLoading ? (
                <Post
                  key={i}
                  isLoading={true}
                  id={0}
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
                  imageUrl={obj.imageUrl}
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
            items={[
              {
                user: {
                  fullName: "Jhon Doe",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Test comments",
              },
              {
                user: {
                  fullName: "Andy Vans",
                  avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
                },
                text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
