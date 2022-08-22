import React from "react";
import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { Header } from "../components";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
