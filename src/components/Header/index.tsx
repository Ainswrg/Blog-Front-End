/* eslint-disable no-alert */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import styles from "./Header.module.scss";
import { selectIsAuth } from "../../redux/auth/selectors";
import { logout } from "../../redux/auth/slice";
import { getTokenLocalStorage, setTokenLocalStorage } from "../../utils";
import { setPostTitle } from "../../redux/posts/slice";
import { setCategoryType } from "../../redux/filter/slice";
import { LocalRoute } from "../../ts/enum";

export const Header: React.FC = () => {
  const isNotAuth = !useSelector(selectIsAuth) && !getTokenLocalStorage();
  const dispatch = useDispatch();

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log")) {
      dispatch(logout());
      setTokenLocalStorage(null);
    }
  };

  const handleOnClick = (name: string): void => {
    dispatch(setPostTitle(name));
    dispatch(setCategoryType(name));
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <div onClick={() => handleOnClick("")}>BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {!isNotAuth ? (
              <>
                <Link to={LocalRoute.ADD_POST}>
                  <Button variant="contained">Write Article</Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error"
                >
                  Exit
                </Button>
              </>
            ) : (
              <>
                <Link to={LocalRoute.LOGIN}>
                  <Button variant="outlined">Enter</Button>
                </Link>
                <Link to={LocalRoute.SIGN_UP}>
                  <Button variant="contained">Create Account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
