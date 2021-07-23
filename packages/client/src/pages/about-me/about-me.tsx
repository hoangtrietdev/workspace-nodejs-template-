import { Card, Col, Descriptions, Divider, Row, Typography } from "antd";
import React, { FC } from "react";
import PreviewImage from "../../components/layout/preview-images";

const AboutMeScreen: FC = () => (
  <div
    className="site-card-wrapper h-screen"
    style={{ padding: 24, minHeight: 360 }}
  >
    <Card>
      <div className="flex p-4">
        <Typography.Title level={5}>Who Am I</Typography.Title>
      </div>
      <Divider style={{ margin: 0 }} />
      <Row>
        <Col span={6}>
          <PreviewImage hidden={false} width={300} />
        </Col>
        <Col span={18}>
          <Descriptions>
            <Descriptions.Item label="Name">
              Hoang Triet Dev
            </Descriptions.Item>
            <Descriptions.Item label="Telephone">
              +84 0333493322
            </Descriptions.Item>
            <Descriptions.Item label="Live">
              Hải Châu, Đà Nẵng
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              41 Nguyễn Tất Thành, Hải Châu, Đà Nẵng
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  </div>
);

export default AboutMeScreen;
