import React from "react";
import { useSelector } from "react-redux";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

import styles from "./CommentsBlock.module.scss";

import { SideBlock } from "../SideBlock";
import { CommentProps } from "../../redux/comments/types";
import { Status } from "../../redux/types";
import { selectAuth } from "../../redux/auth/selectors";
import { useAppDispatch } from "../../redux/store";
import {
  fetchRemoveComment,
  setComment,
  setEditable,
} from "../../redux/comments/slice";
import { time } from "../../utils";

type CommentsBlockProps = {
  items: CommentProps[];
  children?: React.ReactNode;
  isLoading: Status;
  toggle?: () => void;
};

export const CommentsBlock: React.FC<CommentsBlockProps> = ({
  items,
  children,
  isLoading,
  toggle,
}) => {
  const userData = useSelector(selectAuth);
  const dispatch = useAppDispatch();

  const onClickRemove = (id: string) => {
    if (window.confirm(`Are you sure you want to remove`)) {
      dispatch(fetchRemoveComment(id));
      toggle!();
    }
  };
  const onClickEdit = (id: string, text: string) => {
    const field = {
      id,
      text,
    };
    dispatch(setComment(field));
    dispatch(setEditable(true));
  };

  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading === Status.LOADING ? [...Array(5)] : items).map(
          (obj: CommentProps, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  {isLoading === Status.LOADING ? (
                    <Skeleton variant="circular" width={40} height={40} />
                  ) : (
                    <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                  )}
                </ListItemAvatar>
                {isLoading === Status.LOADING ? (
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Skeleton variant="text" height={25} width={120} />
                    <Skeleton variant="text" height={18} width={230} />
                  </div>
                ) : (
                  <div className={styles.root}>
                    <ListItemText
                      primary={obj.user.fullName}
                      secondary={obj.text}
                    />
                    <div>
                      <Typography
                        className={styles.time}
                        variant="body2"
                        fontSize="small"
                        color="InactiveCaptionText"
                      >
                        {time(obj.createdAt)}
                      </Typography>
                      {userData?._id === obj.user._id ? (
                        <div className={styles.icons}>
                          <IconButton
                            className={styles.button}
                            color="primary"
                            disableRipple={false}
                            onClick={() => onClickEdit(obj._id!, obj.text!)}
                          >
                            <EditIcon className={styles.icon} />
                          </IconButton>

                          <IconButton
                            onClick={() => onClickRemove(obj._id as string)}
                            color="secondary"
                            className={styles.button}
                            disableRipple={false}
                          >
                            <DeleteIcon className={styles.icon} />
                          </IconButton>
                        </div>
                      ) : (
                        <div className={styles.icons}></div>
                      )}
                    </div>
                  </div>
                )}
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          )
        )}
      </List>
      {children}
    </SideBlock>
  );
};
