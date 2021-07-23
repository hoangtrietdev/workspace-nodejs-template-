import React from "react";
import "antd/dist/antd.css";
import "../../assets/styles";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "../../routes";

const App = () => (
  <RecoilRoot>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
