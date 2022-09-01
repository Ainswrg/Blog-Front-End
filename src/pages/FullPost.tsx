/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ExtendedPostProps } from "../redux/posts/types";
import { useAppDispatch } from "../redux/store";
import { selectComments } from "../redux/comments/selectors";
import { fetchComments } from "../redux/comments/slice";
import { getTokenLocalStorage } from "../utils";

export const FullPost = () => {
  const [data, setData] = React.useState<ExtendedPostProps>();
  const [isLoading, setLoading] = React.useState(true);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const [isChange, setChange] = React.useState(false);

  const text: string = data?.text ? data.text : "empty";

  const commentsData = useSelector(selectComments);

  const toggle = React.useCallback(() => setChange((state) => !state), []);
  const getComments = () => {
    const currId = id as string;
    dispatch(fetchComments(currId));
  };

  const addCommentClick = React.useCallback(
    async (content: string) => {
      try {
        const field = {
          text: content,
        };

        await axios.post(`/comments/${id}`, field, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getTokenLocalStorage()}`,
          },
        });
        toggle();
      } catch (err) {
        console.warn("Error creating comment");
      }
    },
    [id, toggle]
  );

  React.useEffect(() => {
    getComments();
  }, []);

  React.useEffect(() => {
    axios
      .get<ExtendedPostProps>(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Error");
      });
  }, [id, isChange]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  return (
    <>
      <Post
        id={data?._id}
        title={data?.title}
        imageUrl={
          data?.imageUrl ? `http://localhost:4444/${data.imageUrl}` : ""
        }
        user={data?.user}
        createdAt={data?.createdAt}
        viewsCount={data?.viewsCount}
        commentsCount={data?.commentsCount}
        tags={data?.tags}
        isFullPost
      >
        <ReactMarkdown children={text} />
      </Post>
      <CommentsBlock items={data?.comments!} isLoading={commentsData.status}>
        <AddComment handleOnClick={addCommentClick} />
      </CommentsBlock>
    </>
  );
};
