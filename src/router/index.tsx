import React, { lazy } from "react";
// Navigate重定向组件
import { Navigate } from "react-router-dom";

import Home from "../views/Home";
// import About from  "../views/About"
// import User from  "../views/User"
import Login from "../views/Login";
const VideoAdmin = lazy(() => import("../views/VideoAdmin"));
const User = lazy(() => import("../views/User"));
const Msg = lazy(() => import("../views/Msg"));
const Tag = lazy(() => import("../views/tag/TagView"));
// 报错A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator.
// 懒加载的模式的组件的写法，外面需要套一层 Loading 的提示加载组件

const withLoadingComponent = (comp: JSX.Element) => (
  <React.Suspense fallback={<div>Loading...</div>}>{comp}</React.Suspense>
);
const routes = [
  {
    path: "/",
    element: <Navigate to="/VideoAdmin" />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/VideoAdmin",
        element: withLoadingComponent(<VideoAdmin />),
      },
      {
        path: "/user",
        element: withLoadingComponent(<User />),
      },
      {
        path: "/Msg",
        element: withLoadingComponent(<Msg />),
      },
      {
        path: "/tag",
        element: withLoadingComponent(<Tag />),
      },
    ],
  },
  // 嵌套路由 结束-------------------
  {
    path: "/login",
    element: <Login />,
  },
  // 访问其余路径的时候直接跳到首页
  {
    path: "*",
    element: <Navigate to="/page1" />,
  },

  // {
  //   path:"/home",
  //   element: <Home />
  // },
  // {
  //   path:"/about",
  //   element: withLoadingComponent(<About />)

  // },
  // {
  //   path:"/user",
  //   element: withLoadingComponent(<User />)
  // }
];

export default routes;
