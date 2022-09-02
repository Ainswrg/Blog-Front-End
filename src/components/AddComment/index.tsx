import React from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import styles from "./AddComment.module.scss";
import { selectAuth } from "../../redux/auth/selectors";
import {
  selectComment,
  selectIsEditable,
} from "../../redux/comments/selectors";
import { setComment, setEditable } from "../../redux/comments/slice";

type Props = {
  handleOnClick: (content: string) => void;
};

export const AddComment: React.FC<Props> = ({ handleOnClick }) => {
  const data = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { text } = useSelector(selectComment);
  const isEditable = useSelector(selectIsEditable);
  const [value, setValue] = React.useState("");

  const onChange = (str: string) => {
    setValue(str);
  };

  const onSubmit = async () => {
    const field = {
      id: "",
      text: "",
    };

    handleOnClick(value);
    setValue("");
    dispatch(setComment(field));
    dispatch(setEditable(false));
  };
  React.useEffect(() => {
    setValue(text);
  }, [text, dispatch, isEditable]);

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={data?.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Write comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            onChange={(e) => onChange(e.target.value)}
            value={value}
          />
          {isEditable ? (
            <Button onClick={onSubmit} variant="outlined">
              Save
            </Button>
          ) : (
            <Button onClick={onSubmit} variant="contained">
              Send
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
