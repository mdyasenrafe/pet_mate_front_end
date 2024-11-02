import { baseApi } from "@/api/baseApi";
import { setPremiumStatus } from "../auth";
import { TPayRequest, TPayResponse, TPayment } from ".";
import { TQueryParams, TResponse } from "../types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentHistory: builder.query<TResponse<TPayment[]>, TQueryParams[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return { url: "/payment/payment-history", params: params };
      },
      providesTags: ["Users"],
    }),
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
  useGetPaymentHistoryQuery,
} = paymentApi;
