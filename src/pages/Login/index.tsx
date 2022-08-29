/* eslint-disable no-alert */
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";
import { fetchAuth } from "../../redux/auth/slice";
import { TLoginValues } from "../../redux/auth/types";
import { useAppDispatch } from "../../redux/store";
import { selectIsAuth } from "../../redux/auth/selectors";
import { setTokenLocalStorage } from "../../utils";

export type Payload = {
  avatarUrl: string;
  createdAt: string;
  email: string;
  fullName: string;
  token: string;
  updatedAt: string;
  __v: number;
  _id: string;
};

export const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TLoginValues>({
    defaultValues: {
      email: "test3@gmail.com",
      password: "test123",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: TLoginValues) => {
    const data = await dispatch(fetchAuth(values));
    const payload = data.payload as Payload;
    if (!payload) {
      alert("Failed to login");
    }
    if (payload?.token !== undefined) {
      setTokenLocalStorage(payload.token);
    }
  };

  React.useEffect(() => {});

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required field!",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter valid email!",
            },
          })}
          fullWidth
        />
        <TextField
          className={styles.field}
          {...register("password", {
            required: "Password is required field!",
            minLength: 5,
          })}
          label="Password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button
          disabled={!isValid}
          type="submit"
          size="large"
          variant="contained"
          fullWidth
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};
