import React, { FC } from "react";

const FlexCenter: FC = ({ children }) => (
  <div className="flex flex-col justify-center h-full">
    <div className="mx-auto">{children}</div>
  </div>
);

export default FlexCenter;
