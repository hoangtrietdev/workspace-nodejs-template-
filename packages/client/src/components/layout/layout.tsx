import React, { FC } from "react";
import { Layout as AntdLayout } from "antd";

import Sider from "./sider/sider";

import "./layout.css";
import Header from "./header";

const Layout: FC = ({ children }) => (
  <AntdLayout style={{ minHeight: "100vh" }}>
    <Sider />
    <AntdLayout className="min-h-full">
      <AntdLayout.Content
        className="overflow-auto"
        style={{ backgroundColor: "#f2f4f8" }}
      >
        <Header />
        {children}
      </AntdLayout.Content>
    </AntdLayout>
  </AntdLayout>
);

export default Layout;
