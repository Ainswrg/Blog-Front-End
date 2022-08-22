import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React from "react";

export const NotFoundPage: React.FC = () => {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
      maxWidth={false}
    >
      <Typography
        align="center"
        variant="h2"
        style={{ fontSize: "32px", fontWeight: "bold" }}
      >
        404 Page Not Found
      </Typography>
    </Container>
  );
};
