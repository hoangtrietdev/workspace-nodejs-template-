import React, { ReactNode } from "react";
import { RouteProps } from "react-router-dom";
import {
  BuildOutlined,
  ChromeOutlined,
  ExperimentOutlined,
  IdcardOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AboutMeScreen from "../pages/about-me/lazy";
import ResidencesScreen from "../pages/residences/lazy";
import Residences1Screen from "../pages/residences1/lazy";
import Residences2Screen from "../pages/residences2/lazy";
import LoginScreen from "../pages/login/lazy";

export type RouteItem = Omit<RouteProps, "path"> & {
  name: string;
  title: string;
  icon?: ReactNode;
  path?: string;
  children?: RouteItem[];
  public?: boolean;
  hideInMenu?: boolean;
  fullscreen?: boolean;
};

export const loginRoute: RouteItem = {
  name: "login",
  title: "Login",
  component: LoginScreen,
  path: "/login",
  exact: true,
  hideInMenu: true,
  fullscreen: true,
  public: true,
};

export const routes: RouteItem[] = [
  {
    name: "age17",
    title: "Đăng kí tuổi 17",
    icon: <IdcardOutlined />,
    component: Residences1Screen,
    path: "/age17",
    exact: true,
  },
  {
    name: "army",
    title: "Đã đi bộ đội",
    icon: <IdcardOutlined />,
    component: ResidencesScreen,
    path: "/residences",
    exact: true,
  },
  {
    name: "local",
    title: "Dân quân",
    icon: <IdcardOutlined />,
    component: Residences2Screen,
    path: "/local",
    exact: true,
  },

  // {
  //   name: "experience",
  //   title: "Experience",
  //   icon: <ExperimentOutlined />,
  //   // component: DeployBlueprintScreen,
  //   path: "/",
  //   children: [
  //     {
  //       name: "game",
  //       title: "Game Development",
  //       icon: <BuildOutlined />,
  //       // component: UserScreen,
  //       path: "/game",
  //       exact: true,
  //     },
  //     {
  //       name: "web",
  //       title: "Web Development",
  //       icon: <ChromeOutlined />,
  //       // component: BlueprintScreen,
  //       path: "/web",
  //       exact: true,
  //     },
  //   ],
  // },
  // {
  //   name: "rewards",
  //   title: "Rewards",
  //   icon: <ProfileOutlined />,
  //   path: "/rewards",
  //   exact: true,
  // },
];
