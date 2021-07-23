import React, { FC } from "react";
import { Button, message, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Resident } from "../../services/resident/model";
import { useSetRecoilState } from "recoil";
import { selectedResidentState, showResidentModalState } from "./states";
import Residences2Service from "../../services/resident2";
import { useResidencesContext } from "./context";

const ResidentListAction: FC<{ resident: Resident }> = ({ resident }) => {
  const { list } = useResidencesContext();
  const { fetch } = list;
  const setShowForm = useSetRecoilState(showResidentModalState);
  const setSelectedResident = useSetRecoilState(selectedResidentState);

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
        const res = await Residences2Service.destroy(resident.id);
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
