"use client";

import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "../Button";
import {
  usePaymentFailureMutation,
  usePaymentSuccessMutation,
} from "@/redux/features/premium";

type PaymentFormProps = {
  paymentIntentId: string;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({
  paymentIntentId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const [paymentSuccess] = usePaymentSuccessMutation();
  const [paymentFailure] = usePaymentFailureMutation();

  const handlePayment = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!stripe || !elements) {
        toast.error(
          "Our payment system isn't ready yet. Please try again soon."
        );
        return;
      }

      setIsLoading(true);

      try {
        const { error } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: "http://localhost:3000",
          },
          redirect: "if_required",
        });

        console.log(paymentIntentId);

        if (error) {
          toast.error("We couldn’t process your payment. Give it another try!");
          if (paymentIntentId) {
            await paymentFailure({ paymentIntentId: paymentIntentId });

            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          }
        } else if (paymentIntentId) {
          await paymentSuccess({ paymentIntentId: paymentIntentId });
          toast.success("You're all set! Enjoy your premium PetMate perks.");

          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          toast.success("You're set! Enjoy your premium PetMate perks.");
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        }
      } catch (err) {
        console.error("Payment Error:", err);
        toast.error("Something went wrong during payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [stripe, elements, paymentSuccess, paymentFailure]
  );

  return (
    <form id="payment-form" onSubmit={handlePayment}>
      <PaymentElement id="payment-element" />
      <Button
        color="primary"
        htmlType="submit"
        className="w-full h-[48px] text-[18px] text-white mt-5"
        disabled={isLoading}
        loading={isLoading}
      >
        {isLoading ? "Processing..." : "Pay"}
      </Button>
    </form>
  );
};
