import React, { FC } from "react";
import { GoogleLogin } from "react-google-login";
import { notification as Notification } from "antd";

const FlexCenter: FC = ({ children }) => (
  <div className="flex flex-col justify-center h-full">
    <div className="mx-auto">{children}</div>
  </div>
);

const LoginScreen: FC = () => {
  const handleSuccess = async (response: any) => {
    if (response.tokenId) {
    }
  };

  const handleLoginFailure = (err: any) => {
    Notification.error({ message: err.message });
  };

  return (
    <div className="h-screen">
      <FlexCenter>
        <GoogleLogin
          clientId={""}
          buttonText="Login"
          onSuccess={handleSuccess}
          onFailure={handleLoginFailure}
          cookiePolicy="single_host_origin"
          responseType="code,token"
        />
      </FlexCenter>
    </div>
  );
};

export default LoginScreen;
