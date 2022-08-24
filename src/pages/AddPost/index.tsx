import React from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/auth/selectors";
import { getTokenLocalStorage } from "../../utils";
import axios from "../../axios";

export const AddPost: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState("");
  const [isLoading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const handleChangeFile = async (e: React.FormEvent) => {
    try {
      const formData = new FormData();
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (!file) throw new Error("File is null");
      formData.append("image", file);
      const { data } = await axios.post<Response>("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert(`Error uploading image`);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = await axios.post("/posts", fields);

      const id = data._id;

      navigate(`/posts/${id}`);
    } catch (err) {
      console.warn("Error creating article");
    }
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "1231",
      },
    }),
    []
  );

  if (!getTokenLocalStorage() && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current?.click()}
        variant="outlined"
        size="large"
      >
        Upload
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Remove
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444/${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          type="submit"
          onClick={onSubmit}
          size="large"
          variant="contained"
        >
          Publish
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
