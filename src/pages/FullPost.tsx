import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ExtendedPostProps } from "../redux/posts/types";

export const FullPost = () => {
  const [data, setData] = React.useState<ExtendedPostProps>();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();

  const text: string = data?.text ? data.text : "empty";

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
  }, []);

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
        commentsCount={3}
        tags={data?.tags}
        isFullPost
      >
        <ReactMarkdown children={text} />
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Jhon Doe",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Test Comment 2",
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
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
