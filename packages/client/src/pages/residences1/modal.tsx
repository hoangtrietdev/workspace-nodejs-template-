import React, { FC, useState } from "react";
import { Form, message, Modal } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedResident1State, showResident1ModalState } from "./states";
import { Resident } from "../../services/resident/model";
import Residences1Service from "../../services/resident1";
import ResidentForm from "./form";
import { useResidences1Context } from "./context";

const ResidentModal: FC = () => {
  const { list } = useResidences1Context();
  const { fetch } = list;
  const [showModal, setShowModal] = useRecoilState(showResident1ModalState);
  const selectedResident = useRecoilValue(selectedResident1State);
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
            return Residences1Service.update(value as Resident);
          }
          if (title === "Tạo mới") {
            setLoading(true);
            console.log("Tạo mới", value);
            return Residences1Service.create(value as Resident);
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
