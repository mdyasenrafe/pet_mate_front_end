import { Container } from "@/components/atoms";
import { Row, Col } from "antd";
import { TProps } from "@/types";
import React from "react";
import { BottomNavBar } from "../BottomNavbar";
import { LeftSideBar, RightSideBar } from "./componens";

export const CommonLayout: React.FC<TProps> = ({ children }) => {
  return (
    <Container>
      <Row>
        <Col xs={0} lg={4}>
          <LeftSideBar />
        </Col>
        <Col xs={24} lg={16} className="border-r">
          <main>{children}</main>
        </Col>

        <Col xs={0} lg={4}>
          <RightSideBar />
        </Col>

        <Col xs={24} lg={0}>
          <BottomNavBar />
        </Col>
      </Row>
    </Container>
  );
};
