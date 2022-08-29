/* eslint-disable no-alert */
import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import { useAppDispatch } from "../../redux/store";
import { selectIsAuth } from "../../redux/auth/selectors";
import { TSignUpValues } from "../../redux/auth/types";
import { Payload } from "../Login";
import { fetchSignUp } from "../../redux/auth/slice";
import { setTokenLocalStorage } from "../../utils";
import { TUser } from "../../redux/types";

export const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TSignUpValues>({
    defaultValues: {
      fullName: "Jhon Doe",
      email: "jhondoe@gmail.com",
      password: "test1234",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: TUser) => {
    const data = await dispatch(fetchSignUp(values));

    const payload = data.payload as Payload;
    if (!payload) {
      alert("Failed to registration");
    }
    if (payload?.token !== undefined) {
      setTokenLocalStorage(payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Sign Up
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="Full Name"
          {...register("fullName", {
            required: "Full name is required field!",
          })}
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="E-Mail"
          {...register("email", {
            required: "Email is required field!",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Please enter valid email!",
            },
          })}
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required field!",
            minLength: 5,
          })}
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
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};
