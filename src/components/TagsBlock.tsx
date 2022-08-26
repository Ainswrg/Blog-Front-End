import React from "react";
import { useDispatch } from "react-redux";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";

import { SideBlock } from "./SideBlock";
import { setPostTitle } from "../redux/posts/slice";
import { setCategoryType } from "../redux/filter/slice";

type TagsBlockProps = {
  isLoading: boolean;
  items: string[];
};

export const TagsBlock: React.FC<TagsBlockProps> = ({
  items,
  isLoading = true,
}) => {
  const dispatch = useDispatch();

  const handleOnClick = (name: string): void => {
    dispatch(setPostTitle(name));
    dispatch(setCategoryType(name));
  };

  return (
    <SideBlock title="Tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name: string, i) => (
          <ListItem onClick={() => handleOnClick(name)} key={i} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TagIcon />
              </ListItemIcon>
              {isLoading ? (
                <Skeleton width={100} />
              ) : (
                <ListItemText primary={name} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SideBlock>
  );
};
