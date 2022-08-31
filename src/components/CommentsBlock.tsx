import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { CommentProps } from "../redux/comments/types";
import { Status } from "../redux/types";

type CommentsBlockProps = {
  items: CommentProps[];
  children?: React.ReactNode;
  isLoading: Status;
};

export const CommentsBlock: React.FC<CommentsBlockProps> = ({
  items,
  children,
  isLoading,
}) => {
  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading === Status.LOADING ? [...Array(5)] : items).map(
          (obj, index) => (
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
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
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
