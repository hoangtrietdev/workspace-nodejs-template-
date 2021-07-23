import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Image,
  Switch,
  Upload,
  message,
  Col,
  Row,
} from "antd";
import { FormInstance } from "antd/es/form";
import { Resident } from "../../services/resident/model";
import { UploadOutlined } from "@ant-design/icons";

const RenderImage = (props: any) => {
  if (props.image === null || props.image === undefined) {
    return (
      <Upload
        name="image"
        listType="picture"
        action={"/api/resident/image"}
        onChange={props.onChange}
      >
        <Button icon={<UploadOutlined />}>Click to upload</Button>
      </Upload>
    );
  } else {
    if (props.image.includes(".png")) {
      return (
        <Image src={require(`../residences/images/${props.image}`).default} />
      );
    } else {
      return (
        <Upload
          name="image"
          listType="picture"
          action={"/api/resident/image"}
          onChange={props.onChange}
        >
          <Button icon={<UploadOutlined />}>Click to upload</Button>
        </Upload>
      );
    }
  }
};

const ResidentForm: FC<{ form: FormInstance; obj?: Resident }> = ({
  form,
  obj,
}) => {
  const [imagePath, setImagePath] = useState("");

  const onChange = (info: any) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      setImagePath(info.file.name);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({ image: imagePath });
  }, [imagePath]);

  useEffect(() => {
    if (obj) {
      console.log(obj.ngay_vao_dang);
      form.setFieldsValue(obj);
      setImagePath(obj.image);
    } else {
      form.resetFields();
    }
  }, [obj]);

  return (
    <Form form={form} labelCol={{ flex: "0 0 90px" }}>
      <Form.Item name="id" hidden={true}>
        <Input disabled={true} />
      </Form.Item>
      <Row gutter={24}>
        <Col span={12}>
          <RenderImage image={obj?.image} onChange={onChange} />
          <Form.Item name="image">
            <Input value={imagePath} hidden />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Họ Và Tên"
            name="ho_ten"
            rules={[{ required: true, message: "Hãy nhập họ Và tên!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="SHSQ" name="shsq">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Tuổi"
            name="age"
            rules={[{ required: true, message: "Hãy nhập tuổi!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Năm sinh"
            name="nam_sinh"
            rules={[{ required: true, message: "Hãy nhập năm sinh!" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Quê quán"
            name="que_quan"
            rules={[{ required: true, message: "Hãy nhập quê quán!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Trú quán"
            name="tru_quan"
            rules={[{ required: true, message: "Hãy nhập trú quán!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Địa chỉ"
            name="dia_chi"
            rules={[{ required: true, message: "Hãy nhập địa chỉ!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Văn hoá" name="van_hoa">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Đảng" name="dang">
            {obj?.dang == true || obj?.dang == false ? (
              <Switch defaultChecked={obj?.dang} />
            ) : (
              <Switch defaultChecked={false} />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Đoàn viên" name="doan_vien">
            {obj?.doan_vien == true || obj?.doan_vien == false ? (
              <Switch defaultChecked={obj?.doan_vien} />
            ) : (
              <Switch defaultChecked={false} />
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Vào đảng" name="ngay_vao_dang">
            <Input type="date" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tôn giáo" name="ton_giao">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Sức khoẻ"
            name="suc_khoe"
            rules={[{ required: true, message: "Hãy nhập sức khoẻ!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Nơi làm việc" name="noi_lam_viec">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="SĐT" name="so_dien_thoai">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Cấp bậc" name="cap_bac">
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Chức vụ" name="chuc_vu">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ResidentForm;
