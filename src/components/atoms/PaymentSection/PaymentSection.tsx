"use client";

import React, { useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51Jvkj6FkcxhOaq5HgaV9EVYBhC1EMZgKKEzjKBX61uJWQ3UJyDPQonWazo8pBE81bfhkTT8aRo0WnebbGfXxU2eB00yRxiw1NL"
);

type PaymentSectionProps = {
  clientSecret: string;
  paymentIntentId: string;
};

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  clientSecret,
  paymentIntentId,
}) => {
  const stripeOptions = useMemo(
    () => ({
      clientSecret: clientSecret || "",
    }),
    [clientSecret]
  );

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <PaymentForm paymentIntentId={paymentIntentId} />
    </Elements>
  );
};
