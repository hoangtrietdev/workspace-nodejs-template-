import { Image } from "antd";
import { FC, useEffect, useState } from "react";
import logo from '../../../assets/images/Logo-dark.png'

const PreviewImage: FC<{ hidden: boolean; width: number }> = ({
  hidden = false,
  width,
}) => {
  const [myWidth, setMyWidth] = useState(width);
  useEffect(() => {
    if (hidden) {
      setMyWidth(0);
    } else {
      setTimeout(() => {
        setMyWidth(width);
      }, 100);
    }
    // eslint-disable-next-line
  }, [hidden]);
  return (
    <Image
      hidden={hidden}
      width={myWidth}
      src={logo}
    />
  );
};

export default PreviewImage;
