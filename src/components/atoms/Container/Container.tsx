import { Col, Row } from "antd";
import React from "react";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Row style={{ width: "100%" }}>
      <Col xs={1} sm={2} xxl={3}></Col>
      <Col xs={22} sm={20} xxl={18}>
        {children}
      </Col>
      <Col xs={1} sm={2} xxl={3}></Col>
    </Row>
  );
};
