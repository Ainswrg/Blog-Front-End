import Container from "@mui/material/Container";
import React from "react";
import { Header } from "./components";
import { Home, Login } from "./pages";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Home />
        {/* <Login /> */}
      </Container>
    </>
  );
};

export default App;
