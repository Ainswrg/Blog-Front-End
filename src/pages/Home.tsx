/* eslint-disable no-underscore-dangle */
import React from "react";
import { useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post, CommentsBlock, TagsBlock } from "../components";
import { fetchPosts, fetchTags } from "../redux/posts/slice";
import { useAppDispatch } from "../redux/store";
import { selectPostData } from "../redux/posts/selectors";
import { Status } from "../redux/posts/types";

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, tags } = useSelector(selectPostData);

  const isLoading = posts.status === Status.LOADING;

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
          {(isLoading ? [...Array(5)] : posts.items).map((obj, i) =>
            isLoading ? (
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
                imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                isEditable
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={["react", "typescript", "notes"]}
            isLoading={false}
          />
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
