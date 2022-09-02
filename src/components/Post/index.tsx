import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { ExtendedPostProps } from "../../redux/posts/types";
import { fetchRemovePost, setPostTitle } from "../../redux/posts/slice";
import { useAppDispatch } from "../../redux/store";
import { LocalRoute } from "../../ts/enum";
import { setCategoryType } from "../../redux/filter/slice";
import { time } from "../../utils";

export const Post: React.FC<Partial<ExtendedPostProps>> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useAppDispatch();

  const onClickRemove = () => {
    if (window.confirm("Are you sure you want to remove post?")) {
      if (!id) throw new Error("Id is not defined");
      dispatch(fetchRemovePost(id));
    }
  };

  const handleOnClick = (name: string): void => {
    dispatch(setPostTitle(name));
    dispatch(setCategoryType(name));
  };

  if (isLoading) {
    return <PostSkeleton />;
  }
  const date = time(createdAt!);

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`${LocalRoute.EDIT_POST}/${id}`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={"img"}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={date} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? (
              title
            ) : (
              <Link to={`${LocalRoute.POST}/${id}`}>{title}</Link>
            )}
          </h2>
          <ul className={styles.tags}>
            {tags?.map((name) => (
              <li key={name} onClick={() => handleOnClick(name)}>
                #{name}
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
