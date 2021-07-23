import React, { FC } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import FlexCenter from "./flex-center";

const Loading: FC = () => (
  <div className="h-screen">
    <FlexCenter>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />{" "}
      Loading...
    </FlexCenter>
  </div>
);

export default Loading;
