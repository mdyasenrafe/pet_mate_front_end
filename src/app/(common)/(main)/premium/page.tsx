import React from "react";
import { Container, Text, Button } from "@/components/atoms";
import { FaArrowRightLong, FaRegCircleCheck } from "react-icons/fa6";
import { colors } from "@/theme";
import { Col, Row } from "antd";

const premiumPlans = [
  {
    title: "Premium",
    price: "$99.99",
    duration: "/lifetime",
    features: [
      "Create monetized posts",
      "Access exclusive pet care content",
      "Receive personalized pet care tips",
      "Early access to new features",
    ],
    buttonText: "Upgrade to Premium",
    buttonColor: "primary",
  },
];

const PremiumPage = () => {
  return (
    <Container>
      <div className="my-10">
        <Text variant="h1" className="text-center mb-2 ">
          Unlock Premium Features
        </Text>
        <Text variant="p3" className="text-center  mb-6">
          Start enjoying exclusive pet care tips, personalized advice, and the
          ability to create monetized posts.
        </Text>
        <Row gutter={[16, 16]} justify="center">
          {premiumPlans.map((plan, index) => (
            <Col key={index} lg={12}>
              <div className="border rounded-md bg-white space-y-4 shadow-lg">
                <div className="text-center px-5 pt-3">
                  <Text variant="h5" className="!font-semibold">
                    Starting From
                  </Text>
                  <Text
                    variant="h3"
                    className="font-bold text-red-600 mt-1 mb-2"
                  >
                    {plan.price}{" "}
                    <span className="text-base font-normal">
                      {plan.duration}
                    </span>
                  </Text>
                </div>
                <hr />
                <div className="space-y-3 px-5">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <FaRegCircleCheck
                        className="text-primary mr-3"
                        color={colors.primary}
                      />
                      <Text>{feature}</Text>
                    </div>
                  ))}
                </div>
                <div className="w-full py-2 rounded-b-lg text-white font-semibold bg-red-600 text-center">
                  <Text variant="h5" color="white">
                    {plan.title}
                  </Text>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <Button
          customColor={"primary"}
          className="!w-full !h-[40px] mt-8"
          icon={<FaArrowRightLong />}
          iconPosition="end"
        >
          Upgrade Now
        </Button>
      </div>
    </Container>
  );
};

export default PremiumPage;
