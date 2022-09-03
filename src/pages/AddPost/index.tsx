import React from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/auth/selectors";
import { getTokenLocalStorage } from "../../utils";
import axios from "../../axios";
import { ExtendedPostProps } from "../../redux/posts/types";
import { Routers } from "../../ts/enum";
import { constants } from "../../utils/const";

type PostData = {
  data: ExtendedPostProps;
};

export const AddPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  const isEditable = Boolean(id);

  const handleChangeFile = async (e: React.FormEvent) => {
    try {
      const formData = new FormData();
      const target = e.target as HTMLInputElement;
      const file = target.files && target.files[0];
      if (!file) throw new Error("File is null");
      formData.append("image", file);
      const { data } = await axios.post<Response>(Routers.UPLOAD, formData);
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
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };

      const { data } = isEditable
        ? await axios.put(`${Routers.POST}/${id}`, fields)
        : await axios.post(Routers.ADD_POST, fields);

      const curId: string = isEditable ? id : data._id;

      navigate(`${Routers.POST}/${curId}`);
    } catch (err) {
      console.warn("Error creating article");
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get<ExtendedPostProps, PostData>(`${Routers.POST}/${id}`)
        .then(({ data }: PostData) => {
          setTitle(data.title);
          setText(data.text!);
          setImageUrl(data.imageUrl!);
          setTags(data.tags.join(","));
        })
        .catch((err) => {
          console.warn(err);
          alert("Error getting article");
        });
    }
  }, [id]);

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
            src={`${constants.BASE_URL}/${imageUrl}`}
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
          {isEditable ? "Save" : "Publish"}
        </Button>
        <Link to="/">
          <Button size="large">Cancel</Button>
        </Link>
      </div>
    </Paper>
  );
};
