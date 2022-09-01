import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { AddPost, FullPost, Home, Login, NotFoundPage, SignUp } from "./pages";
import { fetchAuthMe } from "./redux/auth/slice";
import { useAppDispatch } from "./redux/store";
import { LocalRoute } from "./ts/enum";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path={LocalRoute.FULL_POST} element={<FullPost />} />
        <Route path={LocalRoute.EDIT_POST_ID} element={<AddPost />} />
        <Route path={LocalRoute.ADD_POST} element={<AddPost />} />
        <Route path={LocalRoute.LOGIN} element={<Login />} />
        <Route path={LocalRoute.SIGN_UP} element={<SignUp />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
