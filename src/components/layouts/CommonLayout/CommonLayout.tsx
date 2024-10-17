import { Container } from "@/components/atoms";
import { Row, Col } from "antd"; // Import Ant Design's grid system
import { TProps } from "@/types";
import React from "react";
import { LeftSideBar } from "../LeftSideBar";

export const CommonLayout: React.FC<TProps> = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col xs={0} lg={4} className="h-screen">
          <LeftSideBar />
        </Col>

        <Col xs={24} lg={16}>
          {children}
        </Col>

        <Col xs={0} lg={4}>
          <div>
            <h1>Hello, I am right side drawer</h1>
          </div>
        </Col>

        <Col xs={24} lg={0}>
          <nav className="flex">
            <h1>Mobile Navigation</h1>
          </nav>
        </Col>
      </Row>
    </Container>
  );
};
