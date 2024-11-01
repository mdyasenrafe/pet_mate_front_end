import { baseApi } from "@/api/baseApi";
import { setPremiumStatus } from "../auth";
import { TPayRequest, TPayResponse } from ".";
import { TResponse } from "../types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    pay: builder.mutation<TResponse<TPayResponse>, TPayRequest>({
      query: (data) => ({
        url: "payment/pay",
        method: "POST",
        body: data,
      }),
    }),
    paymentSuccess: builder.mutation<void, { paymentIntentId: string }>({
      query: ({ paymentIntentId }) => ({
        url: `payment/payment-success/${paymentIntentId}`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setPremiumStatus());
        } catch {}
      },
    }),
    paymentFailure: builder.mutation<void, { paymentIntentId: string }>({
      query: ({ paymentIntentId }) => ({
        url: `payment/payment-failure/${paymentIntentId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  usePayMutation,
  usePaymentSuccessMutation,
  usePaymentFailureMutation,
} = paymentApi;
