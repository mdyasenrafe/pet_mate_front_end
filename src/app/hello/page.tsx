"use client";

import { Container, Text } from "@/components/atoms";
import { FormInput } from "@/components/form";
import { FormDatePicker } from "@/components/form/FormDatePicker";
import { FormSelect } from "@/components/form/FormSelect";
import { FormWrapper } from "@/components/form/FormWrapper";
import React from "react";

const Page = () => {
  const onSubmit = () => {};

  const transactionTypeOptions = [
    { value: "income", label: "Income" },
    { value: "expense", label: "Expense" },
  ];

  return (
    <Container>
      <Text variant="h1">This is H1 component</Text>
      <Text variant="h2">This is H2 component</Text>
      <Text variant="h3">This is H3 component</Text>
      <Text variant="h4">This is H4 component</Text>
      <Text variant="h5">This is H5 component</Text>
      <Text variant="h6">This is H6 component</Text>

      <Text variant="p1">This is P1 component</Text>
      <Text variant="p2">This is P2 component</Text>
      <Text variant="p3">This is P3 component</Text>
      <Text variant="p4">This is P4 component</Text>
      <Text variant="p5">This is P5 component</Text>
      <Text variant="p6">This is P6 component</Text>

      <Text variant="body">This is Body component</Text>
    </Container>
  );
};

export default Page;
