import React, { FC, useState } from "react";
import { Form, message, Modal } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedResidentState, showResidentModalState } from "./states";
import { Resident } from "../../services/resident/model";
import Residences2Service from "../../services/resident2";
import ResidentForm from "./form";
import { useResidencesContext } from "./context";

const ResidentModal: FC = () => {
  const { list } = useResidencesContext();
  const { fetch } = list;
  const [showModal, setShowModal] = useRecoilState(showResidentModalState);
  const selectedResident = useRecoilValue(selectedResidentState);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
    setShowModal(false);
  };

  const title = selectedResident ? "Sửa thông tin" : "Tạo mới";

  const handleSubmit = async () => {
    form
      .validateFields()
      .then(
        (value) => {
          if (title === "Sửa thông tin") {
            setLoading(true);
            console.log("Sửa thông tin", value);
            return Residences2Service.update(value as Resident);
          }
          if (title === "Tạo mới") {
            setLoading(true);
            console.log("Tạo mới", value);
            return Residences2Service.create(value as Resident);
          }
        },
        (err) => {
          message.error(err.errorFields[0].errors[0]);
        }
      )
      .then(async (res) => {
        setLoading(false);
        if (res && res.ok) {
          console.log(res);
          message.success(`${title} thành công`);
          setShowModal(false);
          fetch();
        }
      });
  };

  return (
    <Modal
      title={title}
      width={1200}
      visible={showModal}
      closable
      onCancel={handleClose}
      onOk={handleSubmit}
      okButtonProps={{ loading }}
    >
      <ResidentForm form={form} obj={selectedResident} />
    </Modal>
  );
};

export default ResidentModal;
