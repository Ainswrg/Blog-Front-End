import React from "react";
import { useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import styles from "./AddComment.module.scss";
import { selectAuth } from "../../redux/auth/selectors";

type Props = {
  handleOnClick: (content: string) => void;
};
export const AddComment: React.FC<Props> = ({ handleOnClick }) => {
  const data = useSelector(selectAuth);
  const [text, setText] = React.useState("");

  const onChange = (str: string) => {
    setText(str);
  };

  const onSubmit = () => {
    handleOnClick(text);
    setText("");
  };

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
            value={text}
          />
          <Button onClick={onSubmit} variant="contained">
            Send
          </Button>
        </div>
      </div>
    </>
  );
};
