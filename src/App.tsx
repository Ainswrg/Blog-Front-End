import Container from "@mui/material/Container";
import React from "react";
import { Header } from "./components";
import { Home } from "./pages/Home";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
      </Container>
    </>
  );
};

export default App;
