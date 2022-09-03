export const enum Routers {
  BASE_URL = "https://ainswrg-mern-blog.herokuapp.com",
  POST = "/posts",
  ADD_POST = "/posts/addPost",
  COMMENTS = "/comments",
  GET_LAST_5_COMMENTS = "/comments/getLastFive",
  UPLOAD = "/upload",
}

export const enum LocalRoute {
  POST = "/posts",
  FULL_POST = "/posts/:id",
  ADD_POST = "/posts/add",
  EDIT_POST_ID = "/posts/edit/:id",
  EDIT_POST = "/posts/edit",
  LOGIN = "/login",
  SIGN_UP = "/signup",
}
