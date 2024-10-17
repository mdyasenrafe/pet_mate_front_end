import { Container } from "@/components/atoms";
import { Row, Col } from "antd";
import { TProps } from "@/types";
import React from "react";
import { LeftSideBar } from "../LeftSideBar";
import { BottomNavBar } from "../BottomNavbar";

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
          <BottomNavBar />
        </Col>
      </Row>
    </Container>
  );
};
