import React, { FC } from "react";
import { Button, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Resident1 } from "../../services/resident/model";
import { useSetRecoilState } from "recoil";
import { selectedResident1State, showResident1ModalState } from "./states";
import Residences1Service from "../../services/resident1";
import { useResidences1Context } from "./context";

const ResidentListAction: FC<{ resident: Resident1 }> = ({ resident }) => {
  const { list } = useResidences1Context();
  const { fetch } = list;
  const setShowForm = useSetRecoilState(showResident1ModalState);
  const setSelectedResident = useSetRecoilState(selectedResident1State);

  const handleEdit = () => {
    setShowForm(true);
    setSelectedResident(resident);
  };

  const handleDelete = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `Xoá ${resident.ho_ten} khỏi danh sách?`,
      okButtonProps: { danger: true },
      onOk: async () => {
        const res = await Residences1Service.destroy(resident.id);
        if (res.ok) {
          message.success("Xoá khỏi danh sách thành công");
          fetch();
        }
      },
    });
  };

  return (
    <Button.Group>
      <Button type="primary" icon={<EditOutlined />} onClick={handleEdit} />
      <Button danger icon={<DeleteOutlined />} onClick={handleDelete} />
    </Button.Group>
  );
};

export default ResidentListAction;
