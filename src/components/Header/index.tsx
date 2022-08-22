import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import styles from "./Header.module.scss";

export const Header: React.FC = () => {
  const isAuth: boolean = false;

  const onClickLogout = () => {};

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <a className={styles.logo} href="/">
            <div>BLOG</div>
          </a>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <a href="/posts/create">
                  <Button variant="contained">Write Article</Button>
                </a>
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
                <a href="/login">
                  <Button variant="outlined">Enter</Button>
                </a>
                <a href="/register">
                  <Button variant="contained">Create Account</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
